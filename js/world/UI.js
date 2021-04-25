import World from "./World.js";

class UI {
    spriteSource = "data/UI.png";

    constructor(value, visible) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.value = value;
        this.visible = visible;

        World.UI.push(this);
    }
}

class Prompt extends UI {
    width = 58;
    height = 20;
    sX = 0;
    sY = 0
}

class HealthBar extends UI {
    width = 20;
    height = 2;
    sX = 58;
    sY = 0
}

export { Prompt, HealthBar };