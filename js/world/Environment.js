class Environment {
    spriteSource = "data/world.png";

    constructor(tileSize, x, y, type) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.width = type.width;
        this.height = type.height;
        this.sX = type.sX;
        this.sY = type.sY;

        if(type.randomPosition) {
            this.x = x * tileSize + Math.floor(Math.random() * (tileSize - type.width));
            if(type.height < tileSize / 2)
                this.y = y * tileSize + Math.floor(Math.random() * (tileSize - type.height));
            else
                this.y = y * tileSize - Math.floor(Math.random() * (tileSize / 2));
        }
        else {
            this.x = x * tileSize + tileSize / 2 - type.width / 2;
            this.y = y * tileSize + tileSize / 2 - type.height / 1.5;
        }

        this.hitBoxX = type.hitBoxX;
        this.hitBoxY = type.hitBoxY;
        this.hitBoxWidth = type.hitBoxWidth;
        this.hitBoxHeight = type.hitBoxHeight;
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

const tree = {
    width: 55,
    height: 61,
    sX: 0,
    sY: 64,

    randomPosition: true,

    hitBoxX: 24,
    hitBoxY: 52,
    hitBoxWidth: 10,
    hitBoxHeight: 10,
}

const bush = {
    width: 29,
    height: 22,
    sX: 55,
    sY: 64,

    randomPosition: true,

    hitBoxX: 8,
    hitBoxY: 10,
    hitBoxWidth: 14,
    hitBoxHeight: 8,
}

const rock = {
    width: 31,
    height: 23,
    sX: 84,
    sY: 64,

    randomPosition: true,

    hitBoxX: 6,
    hitBoxY: 8,
    hitBoxWidth: 18,
    hitBoxHeight: 14,
}

const signLeft = {
    width: 17,
    height: 20,
    sX: 0,
    sY: 125,

    randomPosition: false,

    hitBoxX: 6,
    hitBoxY: 14,
    hitBoxWidth: 5,
    hitBoxHeight: 4,
}

const signRight = {
    width: 17,
    height: 20,
    sX: 17,
    sY: 125,

    randomPosition: false,

    hitBoxX: 6,
    hitBoxY: 14,
    hitBoxWidth: 5,
    hitBoxHeight: 4,
}

export { Environment, tree, bush, rock, signLeft, signRight };