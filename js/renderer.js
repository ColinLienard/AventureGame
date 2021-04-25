import * as controller from "./controller.js";
import * as tools from "./tools.js";

let canvas, ctx, canvasWidth, canvasHeight, ratio, cameraOffsetX, cameraOffsetY;

const init = (width, height, ratioValue) => {
    canvas = document.querySelector("#game");
    ctx = canvas.getContext("2d", { alpha: false });
    
    canvasWidth = width;
    canvasHeight = height;
    ratio = ratioValue;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.imageSmoothingEnabled = false;
}

const resizeGame = () => {
    if(document.fullscreenElement)
        ratio = Math.round(window.innerHeight / canvasHeight);
    else
        ratio = 3;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    ctx.imageSmoothingEnabled = false;
    controller.changeRatio(ratio);
}

const isInField = (sprite) => {
    if(sprite.x + sprite.width > cameraOffsetX &&
       sprite.x < cameraOffsetX + canvasWidth &&
       sprite.y + sprite.height > cameraOffsetY &&
       sprite.y < cameraOffsetY + canvasHeight)
        return true;
    else
        return false;
}
        
const clearCanvas = () => {
    ctx.clearRect(0, 0, 9999, 9999);
}

const followPlayer = (offsetX, offsetY) => {
    cameraOffsetX = Math.abs(offsetX);
    cameraOffsetY = Math.abs(offsetY);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(Math.round(offsetX * ratio), Math.round(offsetY * ratio));
}

const renderTerrain = (terrains) => {
    terrains.forEach(terrain => {
        if(isInField(terrain))
            ctx.drawImage(terrain.sprite, terrain.sX, terrain.sY, terrain.width, terrain.height, terrain.x * ratio, terrain.y * ratio, terrain.width * ratio, terrain.height * ratio);
    });
}

const renderWorld = (sprites) => {
    sprites.forEach(sprite => {
        if(isInField(sprite)) {
            if(sprite.organism) {
                if(sprite.hit) {
                    ctx.filter = "contrast(0) brightness(2)";
                    ctx.drawImage(sprite.sprite , sprite.width * sprite.frame, sprite.height * sprite.direction, sprite.width, sprite.height, Math.round(sprite.x * ratio), Math.round(sprite.y * ratio), Math.round(sprite.width * ratio), Math.round(sprite.height * ratio));
                    ctx.filter = "none";
                    new tools.Waiter(5, () => { sprite.hit = false });
                }
                else
                    ctx.drawImage(sprite.sprite , sprite.width * sprite.frame, sprite.height * sprite.direction, sprite.width, sprite.height, Math.round(sprite.x * ratio), Math.round(sprite.y * ratio), Math.round(sprite.width * ratio), Math.round(sprite.height * ratio));
            }
            else
                ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, sprite.x * ratio, sprite.y * ratio, sprite.width * ratio, sprite.height * ratio);
        }
    });
}

const renderUI = (sprites, player) => {
    sprites.forEach(sprite => {
        if(sprite.visible) {
            switch(sprite.constructor.name) {
                case "Prompt" :
                    ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, Math.round((player.getPosition().x - sprite.width / 2) * ratio), Math.round((player.y - 20) * ratio), Math.round(sprite.width * ratio), Math.round(sprite.height * ratio));
                    ctx.font = 4 * ratio + "px Pixel";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "white";
                    let sentence = sprite.value.split("/");
                    ctx.fillText(sentence[0], Math.round((player.getPosition().x) * ratio), Math.round((player.y - 13) * ratio));
                    ctx.fillText(sentence[1], Math.round((player.getPosition().x) * ratio), Math.round((player.y - 8) * ratio));
                
                case "HealthBar" :
                    if(sprite.value.health > 0 && sprite.value.health < sprite.value.maxHealth) {
                        ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY + sprite.height, sprite.width, sprite.height, Math.round((sprite.value.getPosition().x - sprite.width / 2) * ratio), Math.round((sprite.value.y - 6) * ratio), Math.round(sprite.width * ratio), Math.round(sprite.height * ratio));
        
                        if(sprite.value.hit) {
                            ctx.filter = "contrast(0) brightness(2)";
                            ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, Math.round((sprite.value.getPosition().x - sprite.width / 2) * ratio), Math.round((sprite.value.y - 6) * ratio), Math.round((sprite.width / sprite.value.maxHealth * sprite.value.health) * ratio), Math.round(sprite.height) * ratio);
                            ctx.filter = "none";
                        }
                        else
                        ctx.drawImage(sprite.sprite, sprite.sX, sprite.sY, sprite.width, sprite.height, Math.round((sprite.value.getPosition().x - sprite.width / 2) * ratio), Math.round((sprite.value.y - 6) * ratio), Math.round((sprite.width / sprite.value.maxHealth * sprite.value.health) * ratio), Math.round(sprite.height) * ratio);
                    }
            }
        }
    });
}

const fade = (alpha) => {
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
    ctx.fillRect(0, 0, 9999 * ratio, 9999 * ratio);
}

export { canvas, init, resizeGame, clearCanvas, followPlayer, renderTerrain, renderWorld, renderUI, fade };