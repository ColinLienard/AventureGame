import * as renderer from "./renderer.js";
import Player from "./Player.js";
import Camera from "./Camera.js";
import World from "./world/World.js";
import * as tools from "./tools.js";

let ratio, transitionAlpha, fade, interacting;

const keys = {
    left: false,
    up: false,
    right: false,
    down: false
}

const init = (width, height, ratioValue) => {
    ratio = ratioValue;

    renderer.init(width, height, ratio);

    handlerEvents();

    Camera.init(width, height);
    World.init();
    Player.init(0, 0);

    loop();
}

const handlerEvents = () => {
    window.addEventListener("keydown", bindKey);
    window.addEventListener("keyup", bindKey);

    renderer.canvas.addEventListener("mousedown", (event) => {
        handlerClick(event);
        renderer.canvas.classList.add("mousedown");
    });
    renderer.canvas.addEventListener("mouseup", () => {
        renderer.canvas.classList.remove("mousedown");
    });

    renderer.canvas.addEventListener('contextmenu', handlerClick, false);

    document.addEventListener("fullscreenchange", renderer.resizeGame, false);
}

const loop = () => {
    window.requestAnimationFrame(loop);

    if(tools.waiters.length > 0) {
        tools.waiters.forEach(waiter => {
            waiter.loop();
        });
    }
    
    PlayerMovements(keys);
    ennemiesMovements();
    lootsMovements();

    renderer.clearCanvas();
    renderer.followPlayer(Camera.getOffsetX(), Camera.getOffsetY());
    renderer.renderTerrain(World.terrains);
    renderer.renderWorld(tools.ySort());
    renderer.renderUI(World.UI, Player);

    performTransition();
}

const changeRatio = (newRatio) => ratio = newRatio;

const startTransition = () => fade = "start";

const performTransition = () => {
    switch(fade) {
        case undefined :
            break;
        case "start" :
            transitionAlpha = 0;
            fade = "in";
            break;
        case "in" :
            transitionAlpha += .02;
            renderer.fade(transitionAlpha);
            if(transitionAlpha >= 1) fade = "out";
            break;
        case "out" :
            transitionAlpha -= .02;
            renderer.fade(transitionAlpha);
            if(transitionAlpha <= 0) fade = undefined;
            break;
    }
}

const bindKey = (event) => {
    let keyState = (event.type == "keydown") ? true : false;
    
    switch(event.key) {
        case "q" :
        case "ArrowLeft" :
            keys.left = keyState;
            break;
        case "z" :
        case "ArrowUp" :
            keys.up = keyState;
            break;
        case "d" :
        case "ArrowRight" :
            keys.right = keyState;
            break;
        case "s" :
        case "ArrowDown" :
            keys.down = keyState;
            break;
        case "f" :
            interact();
            break;
    }
}

const handlerClick = (event) => {
    if(event.button == 0 && Player.canMove) {
        let mouseX = Math.floor(event.layerX / ratio - Camera.getOffsetX());
        let mouseY = Math.floor(event.layerY / ratio - Camera.getOffsetY());
        // clickInteraction(mouseX, mouseY, () => { Player.attack(mouseX, mouseY) });
        Player.performAttack(mouseX, mouseY);
    }
    else if(event.button == 2 && Player.canMove) {
        event.preventDefault();
        console.log("clic droit");
    }
}

const interact = () => {
    if(World.interactions.length > 0 && !interacting) {
        World.interactions.forEach(interaction => {
            if(interaction.visible) {
                interacting = true;
                startTransition();
                new tools.Waiter(50, () => {
                    World.changeMap(interaction.map, interaction.playerX, interaction.playerY);
                    interacting = false;
                });
            }
        });
    }
}

const clickInteraction = (mouseX, mouseY, callback) => {
    if(World.interactions.length > 0) {
        World.interactions.forEach(interaction => {
            if(interaction.visible && mouseX > interaction.x && mouseX < interaction.x + World.tileSize && mouseY > interaction.y && mouseY < interaction.y + World.tileSize) {
                new tools.Waiter(50, () => { World.changeMap(interaction.map, interaction.playerX, interaction.playerY) });
                startTransition();
            }
            else
                callback();
        });
    }
    else
        callback();
}

const PlayerMovements = (keys) => {
    Player.loop();

    if(Player.canMove) {
        if(Player.speed < Player.maxSpeed)
            Player.speed += Player.acceleration;

        let speed = Player.speed;
        if(keys.down && (keys.left || keys.right) || keys.up && (keys.left || keys.right))
            speed /= 1.3;
    
        if(keys.down) {
            Player.direction = Player.DOWN;
            Player.y += speed;
        }
        else if(keys.up) {
            Player.direction = Player.UP;
            Player.y -= speed;
        }
    
        if(keys.left) {
            Player.direction = Player.LEFT;
            Player.x -= speed;
        }
        else if(keys.right) {
            Player.direction = Player.RIGHT;
            Player.x += speed;
        }
    
        if(!keys.down && !keys.up && !keys.left && !keys.right) { // immobile
            Player.speed = 0;
            Player.frame = 0;
            Player.isMoving = false;
        }
        else { // en mouvement
            Player.isMoving = true;

            // Limites du monde
            if(Player.x < 0)
                Player.x = 0;
            else if(Player.x > World.getDimension().width - Player.width)
                Player.x = World.getDimension().width - Player.width;
            if(Player.y < 0)
                Player.y = 0;
            else if(Player.y > World.getDimension().height - Player.height)
                Player.y = World.getDimension().height - Player.height;

            World.colliders.forEach(collider => {
                tools.getCollision(Player, collider);
            });

            World.interactions.forEach(interaction => {
                tools.basicCollision(Player, interaction);
            });
        }
    }
}

const ennemiesMovements = () => {
    if(World.ennemies.length > 0) {
        World.ennemies.forEach(ennemy => {
            ennemy.updateState(Player.getPosition());

            // Limites du monde
            if(ennemy.x < 0)
                ennemy.x = 0;
            else if(ennemy.x > World.getDimension().width - ennemy.width)
                ennemy.x = World.getDimension().width - ennemy.width;
            if(ennemy.y < 0)
                ennemy.y = 0;
            else if(ennemy.y > World.getDimension().height - ennemy.height)
                ennemy.y = World.getDimension().height - ennemy.height;

            World.colliders.forEach(collider => {
                tools.getCollision(ennemy, collider);
            });

            // World.ennemies.forEach(ennemy2 => {
            //     if(ennemy != ennemy2) tools.getCollision(ennemy, ennemy2);
            // });
        });
    }
}

const lootsMovements = () => {
    if(World.loots.length > 0) {
        World.loots.forEach(loot => {
            loot.updateState();
        });
    }
}

export { init, changeRatio, startTransition };