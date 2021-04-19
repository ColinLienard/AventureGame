import Player from "../Player.js";
import * as Terrain from "./Terrain.js";
import * as Maps from "./maps.js";
import * as Environment from "./Environment.js";
import * as Interaction from "./Interaction.js";
import * as UI from "./UI.js";
import * as ennemies from "../ennemies.js";

export default {
    tileSize: 64,

    currentMap: Maps.testMap,

    terrains: [],
    colliders: [],
    interactions: [],
    ennemies: [],
    loots: [],
    allSprites: [],
    UI: [],

    init: function() {
        this.buildWorld();
        this.allSprites.push(Player);
    },

    getTile: function(layer, column, row) {
		return this.currentMap.layers[layer][row * this.currentMap.columns + column];
    },

    getDimension: function() {
        return {
            width: this.currentMap.columns * this.tileSize,
            height: this.currentMap.rows * this.tileSize
        }
    },

    changeMap: function(mapId, playerX, playerY) {
        this.terrains = [];
        this.colliders = [];
        this.interactions = [];
        this.ennemies = [];
        this.loots = [];
        this.allSprites = [];
        this.UI = [];

        // for(let map in Maps.allMaps) {
        //     if(map.id == mapId) {
        //         console.log(map);
        //         this.currentMap = map;
        //         break;
        //     }
        // }

        for(let i = 0 ; i < Maps.allMaps.length ; i ++) {
            if(Maps.allMaps[i].id == mapId) {
                this.currentMap = Maps.allMaps[i];
                break;
            }
        }

        this.buildWorld();

        Player.changePosition(playerX, playerY, this.tileSize);
        this.allSprites.push(Player);
    },

    buildWorld: function() {
        for(let i = 0 ; i < this.currentMap.layers.length ; i++) {
            for(let row = 0 ; row < this.currentMap.rows ; row++) {
                for(let column = 0 ; column < this.currentMap.columns ; column++) {
                    let currentTile = this.getTile(i, column, row);
                    switch(currentTile) {

                        // Terrains
                        case this.currentMap.GRASS : // spread ?
                            this.terrains.push(new Terrain.Terrain(this.tileSize, column, row, Terrain.grass));
                            break;
                        case this.currentMap.HORIZONTAL_PATH :
                            this.terrains.push(new Terrain.Terrain(this.tileSize, column, row, Terrain.horizontalGrassPath));
                            break;
                        case this.currentMap.WALL :
                            let WALL = new Terrain.Terrain(this.tileSize, column, row, Terrain.wall);
                            this.terrains.push(WALL);
                            this.colliders.push(WALL);
                            break;

                        // Environments
                        case this.currentMap.EMPTY :
                            break;
                        case this.currentMap.TREE :
                            let TREE = new Environment.Environment(this.tileSize, column, row, Environment.tree);
                            this.colliders.push(TREE);
                            this.allSprites.push(TREE);
                            break;
                        case this.currentMap.BUSH :
                            let BUSH = new Environment.Environment(this.tileSize, column, row, Environment.bush);
                            this.colliders.push(BUSH);
                            this.allSprites.push(BUSH);
                            break;
                        case this.currentMap.ROCK :
                            let ROCK = new Environment.Environment(this.tileSize, column, row, Environment.rock);
                            this.colliders.push(ROCK);
                            this.allSprites.push(ROCK);
                            break;
                        case this.currentMap.SIGN_LEFT :
                            let SIGN_LEFT = new Environment.Environment(this.tileSize, column, row, Environment.signLeft);
                            this.colliders.push(SIGN_LEFT);
                            this.allSprites.push(SIGN_LEFT);
                            break;
                        case this.currentMap.SIGN_RIGHT :
                            let SIGN_RIGHT = new Environment.Environment(this.tileSize, column, row, Environment.signRight)
                            this.colliders.push(SIGN_RIGHT);
                            this.allSprites.push(SIGN_RIGHT);
                            break;
                        case this.currentMap.SPIDER :
                            let SPIDER = new ennemies.Spider(column * this.tileSize, row * this.tileSize);
                            this.ennemies.push(SPIDER);
                            this.allSprites.push(SPIDER);
                            this.UI.push(new UI.UI(UI.healthBar, "healthBar", SPIDER, true));
                            break;
                            
                        // Interactions
                        case this.currentMap.TRAVELER.icon :
                            let POPUP = new UI.UI(UI.popup, "popup", this.currentMap.TRAVELER.text, false);
                            this.UI.push(POPUP);
                            this.interactions.push(new Interaction.Interaction(this.tileSize, column, row, Interaction.traveler, this.currentMap.TRAVELER.map, this.currentMap.TRAVELER.playerX, this.currentMap.TRAVELER.playerY, POPUP));
                            break;
                    }
                }
            }	
        }
    }
}
