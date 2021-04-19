import * as controller from "./controller.js";
import * as tools from "./tools.js";

let canvas, ctx, ratio;

const init = (width, height, ratioValue) => {
    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d", { alpha: false });
    
    ratio = ratioValue;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.imageSmoothingEnabled = false;
}

const resizeGame = () => {
    if(document.fullscreenElement)
        ratio = window.innerHeight / 144;
    else
        ratio = 3;
    canvas.width = 256 * ratio;
    canvas.height = 144 * ratio;
    ctx.imageSmoothingEnabled = false;
    controller.changeRatio(ratio);
}
        
const clearCanvas = () => {
    ctx.clearRect(-999, -999, 999, 999); 
}

const renderTerrain = (terrains) => {
    terrains.forEach(terrain => {
        ctx.drawImage(terrain.sprite, terrain.sX, terrain.sY, terrain.width, terrain.height, terrain.x * ratio, terrain.y * ratio, terrain.width * ratio, terrain.height * ratio);
    });
}

const renderWorld = (sprites) => {
    sprites.forEach(sprite => {
        if(sprite.organism) {
            if(sprite.hit) {
                ctx.filter = "contrast(0) brightness(2)";
                ctx.drawImage(sprite.sprite , sprite.width * sprite.frame, sprite.height * sprite.direction, sprite.width, sprite.height, sprite.x * ratio, sprite.y * ratio, sprite.width * ratio, sprite.height * ratio);
                ctx.filter = "contrast(1) brightness(1)";
                new tools.Waiter(5, () => { sprite.hit = false });
            }
            else
                ctx.drawImage(sprite.sprite , sprite.width * sprite.frame, sprite.height * sprite.direction, sprite.width, sprite.height, sprite.x * ratio, sprite.y * ratio, sprite.width * ratio, sprite.height * ratio);
        }
        else
            ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, sprite.x * ratio, sprite.y * ratio, sprite.width * ratio, sprite.height * ratio);
    });
}

const followPlayer = (cameraOffsetX, cameraOffsetY) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(cameraOffsetX * ratio, cameraOffsetY * ratio);
}

const renderUI = (sprites, player) => {
    sprites.forEach(sprite => {
        if(sprite.visible) {
            if(sprite.typeName == "popup") {
                ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, (player.getPosition().x - sprite.width / 2) * ratio, (player.y - 20) * ratio, sprite.width * ratio, sprite.height * ratio);
                ctx.font = 4 * ratio + "px Pixel";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                let sentence = sprite.value.split("/");
                ctx.fillText(sentence[0], player.getPosition().x * ratio, (player.y - 13) * ratio);
                ctx.fillText(sentence[1], player.getPosition().x * ratio, (player.y - 8) * ratio);
            }
            else if(sprite.typeName == "healthBar" && sprite.value.health > 0 && sprite.value.health < sprite.value.maxHealth) {
                ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY + sprite.height, sprite.width, sprite.height, (sprite.value.getPosition().x - sprite.width / 2 + 1) * ratio, (sprite.value.y - 6 + 1) * ratio, sprite.width * ratio, sprite.height * ratio);

                if(sprite.value.hit) {
                    ctx.filter = "contrast(0) brightness(2)";
                    ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, (sprite.value.getPosition().x - sprite.width / 2) * ratio, (sprite.value.y - 6) * ratio, (sprite.width / sprite.value.maxHealth * sprite.value.health) * ratio, sprite.height * ratio);
                    ctx.filter = "contrast(1) brightness(1)";
                }
                else
                ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, (sprite.value.getPosition().x - sprite.width / 2) * ratio, (sprite.value.y - 6) * ratio, (sprite.width / sprite.value.maxHealth * sprite.value.health) * ratio, sprite.height * ratio);
            }
        }
    });
}

const fade = (alpha) => {
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
    ctx.fillRect(0, 0, 999 * ratio, 999 * ratio);
}

export { canvas, init, resizeGame, clearCanvas, renderTerrain, renderWorld, followPlayer, renderUI, fade };