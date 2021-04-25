import Player from "../Player.js";
import * as Maps from "./maps.js";
import * as Terrain from "./Terrain.js";
import * as Environment from "./Environment.js";
import * as Interaction from "./Interaction.js";
import * as Ennemy from "../Ennemy.js";

const tileSetIndex = {
    // Terrains
    1: Terrain.Grass,
    2: Terrain.HorizontalGrassPath,
    4: Terrain.Cliff,
    5: Terrain.CliffCaveEntry,

    // Environments
    "O": null,
    "A": Environment.OakTree,
    "B": Environment.Bush,
    "R": Environment.Rock,
    "S": Environment.SignLeft,

    // Interactions
    "@1": Interaction.Interaction,
    "@2": Interaction.Interaction,
    "@3": Interaction.Interaction,

    // Ennemies
    "E": Ennemy.Spider
}

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

        for(let map of Maps.allMaps) {
            if(map.id == mapId) {
                this.currentMap = map;
                break;
            }
        }

        this.buildWorld();

        Player.changePosition(playerX, playerY, this.tileSize);
        this.allSprites.push(Player);
    },

    buildWorld: function() {
        for(let layer = 0 ; layer < this.currentMap.layers.length ; layer ++) {
            for(let row = 0 ; row < this.currentMap.rows ; row ++) {
                for(let column = 0 ; column < this.currentMap.columns ; column ++) {
                    const currentTile = this.getTile(layer, column, row);                    
                    switch(currentTile) {
                        case "O" :
                            break;

                        // Interactions
                        case "@1" :
                        case "@2" :
                        case "@3" :
                            new Interaction.Interaction(column, row, this.tileSize, this.currentMap[currentTile]);
                            break;

                        // Terrains, environments & ennemies
                        default :
                            const temporary = new tileSetIndex[currentTile](column, row, this.tileSize);
                            temporary.init();
                            break;
                    }
                }
            }	
        }
    }
}
