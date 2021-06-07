import World from "./World.js";

class Environment {
    spriteSource = "data/world.png";

    constructor(x, y, tileSize) {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
        this.x = x * tileSize;
        this.y = y * tileSize;
        this.tileSize = tileSize;
    }

    init() {
        if(this.randomPosition) {
            this.x += Math.round(Math.random() * (this.tileSize - this.width));
            if(this.height < this.tileSize / 2)
                this.y += Math.round(Math.random() * (this.tileSize - this.height));
            else
                this.y -= Math.round(Math.random() * (this.tileSize / 2));
        }
        else {
            this.x += this.tileSize / 2 - this.width / 2;
            this.y += this.tileSize / 2 - this.height / 1.5;
        }

        World.colliders.push(this);
        World.allSprites.push(this);
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

class OakTree extends Environment {
    width = 55;
    height = 61;
    sX = 0;
    sY = 64;

    randomPosition = true;

    hitBoxX = 24;
    hitBoxY = 52;
    hitBoxWidth = 10;
    hitBoxHeight = 10;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class Bush extends Environment {
    width = 29;
    height = 22;
    sX = 55;
    sY = 64;

    randomPosition = true;

    hitBoxX = 8;
    hitBoxY = 10;
    hitBoxWidth = 14;
    hitBoxHeight = 8;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class Rock extends Environment {
    width = 31;
    height = 23;
    sX = 84;
    sY = 64;

    randomPosition = true;

    hitBoxX = 6;
    hitBoxY = 8;
    hitBoxWidth = 18;
    hitBoxHeight = 14;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class SignLeft extends Environment {
    width = 17;
    height = 20;
    sX = 0;
    sY = 125;

    randomPosition = false;

    hitBoxX = 6;
    hitBoxY = 14;
    hitBoxWidth = 5;
    hitBoxHeight = 4;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

class SignRight extends Environment {
    width = 17;
    height = 20;
    sX = 17;
    sY = 125;

    randomPosition = false;

    hitBoxX = 6;
    hitBoxY = 14;
    hitBoxWidth = 5;
    hitBoxHeight = 4;

    constructor(x, y, tileSize) {
        super(x, y, tileSize);
        super.init();
    }
}

export { Environment, OakTree, Bush, Rock, SignLeft, SignRight };