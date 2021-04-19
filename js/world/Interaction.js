class Interaction {
    visible = false;

    constructor(tileSize, x, y, type, map, playerX, playerY, popup) {
        this.width = type.width;
        this.height = type.height;
        this.x = x * tileSize;
        this.y = y * tileSize;
        this.map = map;
        this.playerX = playerX;
        this.playerY = playerY;
        this.popup = popup;
    }

    show() {
        this.visible = true;
        this.popup.visible = true;
    }

    hide() {
        this.visible = false;
        this.popup.visible = false;
    }
}

const traveler = {
    width: 64,
    height: 64
}

export { Interaction, traveler };