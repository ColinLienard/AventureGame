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
    direction = null;

    frame = 0;
    frameRate = 10;
    frameNumber = 3;
    frameWaiter = 0;
    loopWaiter = 0;

    state = "chase";
    organism = true;
    hit = false;
    move = false;
    collide = false;
    targetPosition = {
        x: 0,
        y: 0
    }
    knockback = 0;

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
        if(this.canMove && this.state != "dead") {
            if(tools.getDistanceFromPlayer(this.getPosition()) < this.detectPlayerRange) {
                if(tools.getDistanceFromPlayer(this.getPosition()) < this.damagePlayerRange) {
                        Player.hit = true;
                        this.canMove = this.move = false;
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
            this.canMove = this.move = true;
        else
            this.loopWaiter ++;

        // Animate
        if(this.move || this.state == "dead") {
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

    findTargetPosition() { // random * (max - min) + min
        this.targetPosition.x = Math.floor(Math.random() * 1200 - 600) + this.x;
        this.targetPosition.y = Math.floor(Math.random() * 1200 - 600) + this.y;
        if(this.targetPosition.x < 0 || this.targetPosition.x > World.getDimension().width || this.targetPosition.y < 0 || this.targetPosition.y > World.getDimension().height)
            this.findTargetPosition();
    }

    wander() {
        if((this.getPosition().x == this.targetPosition.x && this.getPosition().y == this.targetPosition.y) || this.colliding == true || this.state == "chase" || this.loopWaiter > Math.floor(Math.random() * 600 + 200)) {
            this.findTargetPosition();
            this.loopWaiter = 0;
            this.colliding = false;
        }
        else if(this.loopWaiter < 120)
            tools.moveTo(this, this.targetPosition, this.speed, true);
        else {
            this.move = false;
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
        this.direction = 4;
        this.frameNumber = this.dyingFrameNumber + 1;
            
        new Loot.Loot(this.getPosition(), this.loot);
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
    loot = Loot.cobweb;
}

export { Spider };