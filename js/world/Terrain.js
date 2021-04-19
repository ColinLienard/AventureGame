class Terrain {
    spriteSource = "data/world.png";

    constructor(tileSize, x, y, type) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.width = this.height = tileSize;
        this.sX = type.sX;
        this.sY = type.sY;
        this.x = x * tileSize;
        this.y = y * tileSize;

        if(type.hitBoxX != undefined) {
            this.hitBoxX = type.hitBoxX;
            this.hitBoxY = type.hitBoxY;
            this.hitBoxWidth = type.hitBoxWidth;
            this.hitBoxHeight = type.hitBoxHeight;
        }
    }

    getHitBox() {
        return {
            x: this.x + this.hitBoxX,
            y: this.y + this.hitBoxY,
            width: this.hitBoxWidth,
            height: this.hitBoxHeight
        }
    }
}

const grass = {
    sX: 0,
    sY: 0
}

const horizontalGrassPath = {
    sX: 64,
    sY: 0
}

const verticalGrassPath = {
    sX: 128,
    sY: 0
}

const wall = {
    sX: 192,
    sY: 0,

    hitBoxX: 0,
    hitBoxY: 10,
    hitBoxWidth: 64,
    hitBoxHeight: 40,
}

export { Terrain, grass, horizontalGrassPath, verticalGrassPath, wall };