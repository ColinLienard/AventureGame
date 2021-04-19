export default {
    sprite: null,
    spriteSource: "data/cursor.png",
    width: 7,
    height: 7,

    x: null,
    y: null,
    X: null,
    Y: null,

    init: function() {
        this.sprite = new Image();
        this.sprite.src = this.spriteSource;
    }
}