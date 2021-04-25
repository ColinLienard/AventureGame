import World from "./World.js";
import * as UI from "./UI.js";

class Interaction {
    visible = false;

    constructor(x, y, tileSize, values) {
        this.x = x * tileSize + tileSize / 4;
        this.y = y * tileSize + tileSize / 4;
        this.width = this.height = tileSize / 2;
        this.map = values.map;
        this.playerX = values.playerX;
        this.playerY = values.playerY;
        
        this.prompt = new UI.Prompt(values.text, false);

        World.interactions.push(this);
    }

    show() {
        this.visible = true;
        this.prompt.visible = true;
    }

    hide() {
        this.visible = false;
        this.prompt.visible = false;
    }
}

export { Interaction };