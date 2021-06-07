import Player from "./Player.js";
import World from "./world/World.js";
import * as UI from "./world/UI.js";
import * as Loot from "./Loot.js";
import * as tools from "./tools.js";

class Ennemy {
    sprite = null;

    DOWN = 0;
    UP = 1;
    LEFT = 2;
    RIGHT = 3;
    direction = 0;

    frame = 0;
    frameRate = 10;
    frameNumber = 3;
    frameWaiter = 0;
    loopWaiter = 0;

    state = "chase";
    organism = true;
    isMoving = false;
    canMove = true;
    hit = false;
    collide = false;
    targetPosition = {
        x: 0,
        y: 0
    }
    knockback = 0;
    timeToStop = null;

    constructor(x, y, tileSize) {
        this.sprite = new Image();
        this.x = x * tileSize;
        this.y = y * tileSize;
    }

    init() {
        this.sprite.src = this.spriteSource;

        World.ennemies.push(this);
        World.allSprites.push(this);
        new UI.HealthBar(this, true);
    }

    getPosition() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }

    getHitBox() {
        return {
            x: this.x + 4,
            y: this.y + 6,
            width: this.width - 8,
            height: this.height - 6
        }
    }

    updateState(playerPosition) {
        if(this.canMove) {
            if(tools.getDistanceFromPlayer(this.getPosition()) <= this.detectPlayerRange) {
                if(tools.getDistanceFromPlayer(this.getPosition()) <= this.damagePlayerRange) {
                        Player.hit = true;
                        this.canMove = this.isMoving = false;
                        this.loopWaiter = 0;
                    }
                else {
                    this.chase(playerPosition);
                    this.state = "chase";
                }
            }
            else {
                this.wander();
                this.state = "wander";
                this.loopWaiter ++;
            }
        }
        else if(this.state == "repulsed" || this.state == "dead") {
            this.repulse();
            this.loopWaiter ++;
        }
        else if(this.loopWaiter > 30) // Peut bouger après avoir touché le joueur
            this.canMove = this.isMoving = true;
        else
            this.loopWaiter ++;

        // Animate
        if(this.isMoving || this.state == "dead") {
            if(this.frameWaiter == 0) {
                if(this.frame < this.frameNumber - 1)
                    this.frame++;
                else
                    this.frame = 0;
        
                this.frameWaiter = 60 / this.frameRate;
            }
            this.frameWaiter--;
        }

        if(this.state == "dead" && this.frame > this.dyingFrameNumber - 1) { // Supprime l'instance
            World.ennemies.splice(World.ennemies.indexOf(this), 1);
            World.allSprites.splice(World.allSprites.indexOf(this), 1);

            tools.deleteObject(this);
        }
    }

    findTargetPosition() {
        this.targetPosition.x = Math.floor(Math.random() * 200 - 100 + this.x);
        this.targetPosition.y = Math.floor(Math.random() * 200 - 100 + this.y);
        
        if(this.targetPosition.x < 0 || this.targetPosition.x > World.getDimension().width || this.targetPosition.y < 0 || this.targetPosition.y > World.getDimension().height)
            this.findTargetPosition();
        else
            this.timeToStop = Math.floor(Math.random() * 250 + 50);
    }

    wander() {
        if(this.colliding || this.state == "chase" || this.loopWaiter >= this.timeToStop || tools.getDistance(this.getPosition().x, this.getPosition().y, this.targetPosition.x, this.targetPosition.y) < 5) { // (this.getPosition().x == this.targetPosition.x && this.getPosition().y == this.targetPosition.y)
            this.findTargetPosition();
            this.loopWaiter = 0;
            this.colliding = false;
        }
        else if(this.loopWaiter < 150)
            tools.moveTo(this, this.targetPosition, this.speed, true);
        else {
            this.isMoving = false;
            this.frame = 0;
        }
    }

    chase(playerPosition) {
        tools.moveTo(this, playerPosition, this.aggroSpeed, true);
    }

    repulse(force, playerDirection) {
        if(playerDirection != undefined) { // Peut être égal à 0
            this.state = "repulsed";
            this.canMove = false;
            this.loopWaiter = 0;
            this.knockback = force;

            switch(playerDirection) {
                case 0 :
                    this.targetPosition.x = this.x;
                    this.targetPosition.y = this.y + 50;
                    break;
                case 1 :
                    this.targetPosition.x = this.x;
                    this.targetPosition.y = this.y - 50;
                    break;
                case 2 :
                    this.targetPosition.x = this.x - 50;
                    this.targetPosition.y = this.y;
                    break;
                case 3 :
                    this.targetPosition.x = this.x + 50;
                    this.targetPosition.y = this.y;
                    break;
            }
        }
        else if(this.loopWaiter > 10) {
            if(this.state != "dead") {
                this.canMove = true;
                this.state = "wander";
            }
        }
        else {
            tools.moveTo(this, this.targetPosition, this.knockback);
            this.knockback -= .01;
        }
        
    }

    die() {
        this.state = "dead";
        this.canMove = false;
        this.direction = 4;
        this.frameNumber = this.dyingFrameNumber + 1;
        
        const dropRate = Math.floor(Math.random() * (this.loot.maxRate - this.loot.minRate + 1) + this.loot.minRate);
        for(let i = 0 ; i < dropRate ; i ++) {
            new this.loot.type(this.getPosition());
        }
    }
}

class Spider extends Ennemy {
    spriteSource = "data/spider.png";
    width = 33;
    height = 24;

    speed = .3;
    aggroSpeed = .7;
    health = 14;
    maxHealth = 14;
    dyingFrameNumber = 9;
    detectPlayerRange = 70;
    damagePlayerRange = 10;
    loot = {
        type: Loot.Cobweb,
        minRate: 1,
        maxRate: 3
    };

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

export { Spider };