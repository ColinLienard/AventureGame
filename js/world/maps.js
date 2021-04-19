const mapsFinder = {
    testMap: 1,
    otherMap: 2
}

const testMap = {
    id: 1,
    columns: 10,
    rows: 5,
    
    layers: [[
        // Terrains
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 4, 4, 4, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ], [
        // Environments
        "B", "R", "A", "O", "O", "O", "O", "O", "O", "O",
        "S", "E", "P", "E", "O", "O", "O", "O", "O", "O",
        "E", "A", "R", "A", "O", "O", "O", "O", "O", "O",
        "R", "B", "A", "A", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"
    ], [
        // Interactions
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "X", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    ]],

    GRASS: 1,
    HORIZONTAL_PATH: 2,
    WALL: 4,

    EMPTY: "O",
    PLAYER: "P",
    TREE: "A",
    BUSH: "B",
    ROCK: "R",
    SIGN_LEFT: "S",
    SPIDER: "E",

    TRAVELER: {
        icon: "X",
        map: mapsFinder.otherMap,
        text: "Voyager jusqu'au/tutoriel ?",
        playerX: 3,
        playerY: 1
    }
}

const otherMap = {
    id: 2,
    columns: 4,
    rows: 3,
    
    layers: [[
        // Terrains
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1
    ], [
        // Environments
        "A", "B", "O", "B",
        "O", "P", "A", "S",
        "B", "A", "R", "A"
    ], [
        // Interactions
        "O", "O", "O", "O",
        "O", "O", "O", "X",
        "O", "O", "O", "O"
    ]],

    GRASS: 1,
    HORIZONTAL_PATH: 2,

    EMPTY: "O",
    PLAYER: "P",
    TREE: "A",
    BUSH: "B",
    ROCK: "R",
    SIGN_RIGHT: "S",

    TRAVELER: {
        icon: "X",
        map: mapsFinder.testMap,
        text: "Voyager jusqu'à/la map de test ?",
        playerX: 0,
        playerY: 1
    }
}

const allMaps = [testMap, otherMap];

export { mapsFinder, testMap, otherMap, allMaps };