class UI {
    spriteSource = "data/UI.png";

    constructor(type, typeName, value, visible) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.typeName = typeName;
        this.width = type.width;
        this.height = type.height;
        this.sX = type.sX;
        this.sY = type.sY;
        this.value = value;
        this.visible = visible;
    }
}

const popup = {
    width: 64,
    height: 20,
    sX: 0,
    sY: 0
}

const healthBar = {
    width: 20,
    height: 2,
    sX: 64,
    sY: 0
}

export { UI, popup, healthBar };