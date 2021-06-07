import World from "./World.js";

class Terrain {
    spriteSource = "data/world.png";

    constructor(x, y, tileSize) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.x = x * tileSize;
        this.y = y * tileSize;
        this.width = this.height = tileSize;
    }

    init() {
        World.terrains.push(this);

        if(this.hitBoxX != undefined)
            World.colliders.push(this);
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

class Grass extends Terrain {
    sX = 0;
    sY = 0;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class HorizontalGrassPath extends Terrain {
    sX = 64;
    sY = 0;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class Cliff extends Terrain {
    sX = 256;
    sY = 0;

    hitBoxX = 0;
    hitBoxY = 10;
    hitBoxWidth = 64;
    hitBoxHeight = 40;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class CliffCaveEntry extends Terrain {
    sX = 320;
    sY = 0;

    hitBoxX = 0;
    hitBoxY = 10;
    hitBoxWidth = 64;
    hitBoxHeight = 40;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class CaveGround extends Terrain {
    sX = 256;
    sY = 128;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class CaveTopWall extends Terrain {
    sX = 256;
    sY = 64;

    hitBoxX = 0;
    hitBoxY = 0;
    hitBoxWidth = 64;
    hitBoxHeight = 54;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class CaveExit extends Terrain {
    sX = 384;
    sY = 64;

    hitBoxX = 0;
    hitBoxY = 0;
    hitBoxWidth = 64;
    hitBoxHeight = 54;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

export { Grass, HorizontalGrassPath, Cliff, CliffCaveEntry, CaveGround, CaveTopWall, CaveExit };