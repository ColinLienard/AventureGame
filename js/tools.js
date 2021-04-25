import * as controller from "./controller.js";
import Player from "./Player.js";
import World from "./world/World.js";

let waiters = [];

class Waiter {
    constructor(framesToWait, callback) {
        this.frameWaiter = 0;
        this.framesToWait = framesToWait;
        this.callback = callback;

        waiters.push(this);
    }

    loop() {
        if(this.framesToWait) {
            if(this.frameWaiter == this.framesToWait) {
                this.callback();
                waiters.splice(waiters.indexOf(this), 1);
                deleteObject(this);
            }
            this.frameWaiter ++;
        }
    }
}

const basicCollision = (organism, collider) => {
    if(getDistance(organism.x, organism.y, collider.x, collider.y) < 100) {
        let organismHitBox = organism.getHitBox();
        if(organism.x + organism.width > collider.x && organism.x < collider.x + collider.width && organism.y + organism.height > collider.y && organism.y < collider.y + collider.height)
            collider.show();
        else
            collider.hide();
    }
}

const getCollision = (organism, collider) => {
    if(getDistance(organism.x, organism.y, collider.x, collider.y) < 100) {
        let vx, vy, dw, dh, overlapX, overlapY;
        let organismHitBox = organism.getHitBox();
        let colliderHitBox = collider.getHitBox();
    
        // Calcul de la distance entre les deux rectangles
        vx = (organismHitBox.x + organismHitBox.width / 2) - (colliderHitBox.x + colliderHitBox.width / 2);
        vy = (organismHitBox.y + organismHitBox.height / 2) - (colliderHitBox.y + colliderHitBox.height / 2);
    
        // Distance minimum avant la collision
        dw = (organismHitBox.width) / 2 + (colliderHitBox.width) / 2;
        dh = (organismHitBox.height) / 2 + (colliderHitBox.height) / 2;
    
        if(Math.abs(vx) < dw) {
            if(Math.abs(vy) < dh) {
                // if(organism.state == "wander") organism.state = "chase"; // Pour trouver une nouvelle targetPosition
                if(organism.state == "wander") organism.colliding = true; // Pour trouver une nouvelle targetPosition
    
                overlapX = dw - Math.abs(vx);
                overlapY = dh - Math.abs(vy);
    
                if(overlapX >= overlapY) {
                    if(vy > 0)
                        organism.y = organism.y + overlapY; // top
                    else
                        organism.y = organism.y - overlapY; // bottom
                }
                else {
                    if(vx > 0)
                        organism.x = organism.x + overlapX; // left
                    else
                        organism.x = organism.x - overlapX; // right
                }
            }
        }
    }
}

const ySort = () => {
    return World.allSprites.sort((sprite1, sprite2) => {
        return (sprite1.y + sprite1.height > sprite2.y + sprite2.height) ? 1 : -1;
    });
}

const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const getDistanceFromPlayer = (ennemyPosition) => {
    let playerPosition = Player.getPosition();
    return Math.sqrt(Math.pow(ennemyPosition.x - playerPosition.x, 2) + Math.pow(ennemyPosition.y - playerPosition.y, 2));
}

const moveTo = (organism, target, speed, changeDirection) => {
    let position = organism.getPosition();
    let dx = target.x - position.x;
    let dy = target.y - position.y;
    let length = Math.sqrt(dx * dx + dy * dy);
    dx /= length;
    dy /= length;

    organism.x += dx * speed;
    organism.y += dy * speed;

    organism.move = true;
    
    if(changeDirection) {
        let angle = Math.atan2(target.y - position.y, target.x - position.x) * 180 / Math.PI;

        if(angle > -45 && angle < 45)
            organism.direction = organism.RIGHT;
        else if(angle > 45 && angle < 135)
            organism.direction = organism.DOWN;
        else if(angle > 135 || angle < -135)
            organism.direction = organism.LEFT;
        else
            organism.direction = organism.UP;
    }
}

const deleteObject = (toDelete) => toDelete = null;

export { waiters, Waiter, basicCollision, getCollision, ySort, getDistance, getDistanceFromPlayer, moveTo, deleteObject };