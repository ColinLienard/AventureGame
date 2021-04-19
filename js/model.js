import * as controller from "./controller.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import World from "./world/World.js";

let player = Player;
let camera = Camera;
let world = World;

const init = (width, height) => {
    camera.init(width, height);
    world.init(player);
}

const playerMovements = (keys) => {
    player.loop();

    if(player.canMove) {
        if(player.speed < player.maxSpeed)
            player.speed += player.acceleration;

        let speed = player.speed;
        if(keys.down && (keys.left || keys.right) || keys.up && (keys.left || keys.right))
            speed /= 1.3;
    
        if(keys.down) {
            player.direction = player.DOWN;
            player.y += speed;
        }
        else if(keys.up) {
            player.direction = player.UP;
            player.y -= speed;
        }
    
        if(keys.left) {
            player.direction = player.LEFT;
            player.x -= speed;
        }
        else if(keys.right) {
            player.direction = player.RIGHT;
            player.x += speed;
        }
    
        if(!keys.down && !keys.up && !keys.left && !keys.right) { // immobile
            player.speed = 0;
            player.frame = 0;
            player.move = false;
        }
        else { // en mouvement
            player.move = true;

            // Limites du monde
            if(player.x < 0)
                player.x = 0;
            else if(player.x > world.getDimension().width - player.width)
                player.x = world.getDimension().width - player.width;
            if(player.y < 0)
                player.y = 0;
            else if(player.y > world.getDimension().height - player.height)
                player.y = world.getDimension().height - player.height;

            World.interactions.forEach(interaction => {
                basicCollision(player, interaction);
            });

            World.colliders.forEach(collider => {
                getCollision(player, collider);
            });
        }
    }
}

const ennemiesMovements = () => {
    if(world.ennemies.length > 0) {
        world.ennemies.forEach(ennemy => {
            ennemy.updateState(player.getPosition());

            // Limites du monde
            if(ennemy.x < 0)
                ennemy.x = 0;
            else if(ennemy.x > world.getDimension().width - ennemy.width)
                ennemy.x = world.getDimension().width - ennemy.width;
            if(ennemy.y < 0)
                ennemy.y = 0;
            else if(ennemy.y > world.getDimension().height - ennemy.height)
                ennemy.y = world.getDimension().height - ennemy.height;

            world.colliders.forEach(collider => {
                getCollision(ennemy, collider);
            });

            /*world.ennemies.forEach(ennemy2 => {
                if(ennemy != ennemy2) getCollision(ennemy, ennemy2);
            });*/
        });
    }
}

const lootsMovements = () => {
    if(world.loots.length > 0) {
        world.loots.forEach(loot => {
            loot.updateState();
        });
    }
}

const basicCollision = (organism, collider) => {
    if(organism.getHitBox().x + organism.getHitBox().width > collider.x && organism.getHitBox().x < collider.x + world.tileSize && organism.getHitBox().y + organism.getHitBox().height > collider.y && organism.getHitBox().y < collider.y + world.tileSize)
        collider.show();
    else
        collider.hide();
}

const getCollision = (organism, collider) => {
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
            if(organism.state == "wander") organism.state = "chase"; // Pour trouver une nouvelle targetPosition

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

const clickInteraction = (mouseX, mouseY, callback) => {
    if(world.interactions.length > 0) {
        world.interactions.forEach(interaction => {
            if(interaction.visible && mouseX > interaction.x && mouseX < interaction.x + world.tileSize && mouseY > interaction.y && mouseY < interaction.y + world.tileSize) {
                controller.waiter.init(50, () => { world.changeMap(interaction.map, interaction.playerX, interaction.playerY) });
                controller.performTransition(true);
            }
            else
                callback();
        });
    }
    else
        callback();
}

const ySort = () => {
    return world.allSprites.sort((sprite1, sprite2) => {
        return (sprite1.y + sprite1.height > sprite2.y + sprite2.height) ? 1 : -1;
    });
}

const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const getDistanceFromPlayer = (ennemyPosition) => {
    let playerPosition = player.getPosition();
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

const performAttack = () => {
    world.ennemies.forEach(ennemy => {
        if(getDistanceFromPlayer(ennemy.getPosition()) < player.attackRange && (
           (player.direction == player.UP && player.y > ennemy.y) ||
           (player.direction == player.RIGHT && player.x < ennemy.x) ||
           (player.direction == player.DOWN && player.y < ennemy.y) ||
           (player.direction == player.LEFT && player.x + player.width > ennemy.x + ennemy.width))) {

            ennemy.hit = true;
            ennemy.repulse(player.force, player.direction);
            ennemy.health -= player.damage;

            if(ennemy.health <= 0) // Kill ennemy
                ennemy.die();
        }
    });
}

const deleteObject = (toDelete) => {
    toDelete = null;
}

export { player, camera, world, init, playerMovements, ennemiesMovements, lootsMovements, clickInteraction, ySort, getDistance, getDistanceFromPlayer, moveTo, performAttack, deleteObject };