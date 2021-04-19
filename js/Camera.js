import Player from "./Player.js";
import World from "./world/World.js";

export default {
    canvasWidth: null,
    canvasHeight: null,
    midScreenX: null,
    midScreenY: null,
    moveX: false,
    moveY: false,

    init: function(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.midScreenX = (width - Player.width) / 2;
        this.midScreenY = (height - Player.height) / 2;
    },

    getOffsetX: function() {
        this.moveX = false;

        if(this.midScreenX - Player.x < - World.getDimension().width + this.canvasWidth && World.getDimension().width > this.canvasWidth)
            return - World.getDimension().width + this.canvasWidth;
        else if(this.midScreenX - Player.x < 0 && World.getDimension().width > this.canvasWidth) {
            this.moveX = Player.move;    
            return this.midScreenX - Player.x;
        }
        else
            return 0;
    },

    getOffsetY: function() {
        this.moveY = false;
        
        if(this.midScreenY - Player.y < - World.getDimension().height + this.canvasHeight && World.getDimension().height > this.canvasHeight)
            return - World.getDimension().height + this.canvasHeight;
        else if(this.midScreenY - Player.y < 0 && World.getDimension().height > this.canvasHeight) {    
            this.moveY = Player.move;
            return this.midScreenY - Player.y;
        }
        else
            return 0;
    }
}