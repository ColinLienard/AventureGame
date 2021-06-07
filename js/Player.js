// const SPRITE_SOURCE = "";

// class Player {

//     #width = 24;

//     constructor() {

//         Player.instance = this;
//         console.log('new instance created');
//     }

//     get width() {

//         return this.#width;
//     }

//     static getInstance() {

//         if(!Player.instance)
//             return new Player();

//         return this.instance;
//     }
// }

// console.log(Player.getInstance().width);

import World from "./world/World.js";
import * as tools from "./tools.js";

export default {
    sprite: null,
    spriteSource: "data/player.png",
    width: 24,
    height: 32,

    DOWN: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3,
    direction: 0,

    frame: 0,
    frameRate: 10,
    frameNumber: 8,
    frameWaiter: 0,

    speed: 0,
    acceleration: .1,
    maxSpeed: 1.3,
    attackRange: 32,
    force: 1.5,
    damage: 4,
    
    organism: true,
    isMoving: false,
    canMove: true,
    attacking: false,
    hit: false,

    init: function(x, y) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;

        this.x = x;
        this.y = y;
    },

    loop: function() {
        if(this.isMoving || this.attacking) {

            // End attack animation
            if(this.attacking && this.frame > 10) {
                this.attacking = false;
                this.canMove = true;
                this.frameNumber -= 4;
            }

            if(this.frameWaiter == 0) {
                if(this.frame < this.frameNumber - 1)
                    this.frame++;
                else
                    this.frame = 0;
        
                this.frameWaiter = 60 / this.frameRate;
            }
            this.frameWaiter--;
        }
    },

    getPosition: function() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    },

    getHitBox: function() {
        return {
            x: this.x + 4,
            y: this.y + 24,
            width: this.width - 8,
            height: this.height - 24
        }
    },

    changePosition: function(x, y, tileSize) {
        this.x = x * tileSize + tileSize / 2 - this.width / 2;
        this.y = y * tileSize + tileSize / 2 - this.height / 2;
        this.direction = 0;
    },

    performAttack: function(mouseX, mouseY) {
        let angle = Math.atan2(mouseY - this.getPosition().y, mouseX - this.getPosition().x) * 180 / Math.PI;

        if(angle > -45 && angle < 45)
            this.direction = this.RIGHT;
        else if(angle > 45 && angle < 135)
            this.direction = this.DOWN;
        else if(angle > 135 || angle < -135)
            this.direction = this.LEFT;
        else
            this.direction = this.UP;
    
        this.canMove = false;
        this.speed = 0;
        this.frame = 8;
        this.frameNumber += 4;
        this.attacking = true;

        World.ennemies.forEach(ennemy => {
            if(tools.getDistanceFromPlayer(ennemy.getPosition()) < this.attackRange && (
            (this.direction == this.UP && this.y + this.height > ennemy.y + ennemy.height) ||
            (this.direction == this.RIGHT && this.x < ennemy.x) ||
            (this.direction == this.DOWN && this.y < ennemy.y) ||
            (this.direction == this.LEFT && this.x + this.width > ennemy.x + ennemy.width))) {

                ennemy.hit = true;
                ennemy.repulse(this.force, this.direction);
                ennemy.health -= this.damage;

                if(ennemy.health <= 0) // Kill ennemy
                    ennemy.die();
            }
        });
    }
}