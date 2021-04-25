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
        1, 1, 1, 1, 1, 4, 4, 5, 4, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ], [
        // Environments
        "B", "R", "A", "O", "O", "O", "O", "O", "O", "O",
        "S", "E", "O", "E", "O", "O", "O", "O", "O", "O",
        "E", "A", "R", "A", "O", "O", "O", "O", "O", "O",
        "R", "B", "A", "A", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O"
    ], [
        // Interactions
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "@1", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "@2", "O", "O",
        "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    ]],

    "@1": {
        map: mapsFinder.otherMap,
        text: "Voyager jusqu'au/tutoriel ?",
        playerX: 3,
        playerY: 1
    },
    "@2": {
        map: mapsFinder.otherMap,
        text: "Voyager jusqu'au/test ?",
        playerX: 2,
        playerY: 2
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
        "O", "O", "A", "S",
        "B", "A", "R", "A"
    ], [
        // Interactions
        "O", "O", "O", "O",
        "O", "O", "O", "@1",
        "O", "O", "O", "O"
    ]],

    "@1": {
        map: mapsFinder.testMap,
        text: "Voyager jusqu'au/tutoriel ?",
        playerX: 0,
        playerY: 1
    }
}

const allMaps = [testMap, otherMap];

export { testMap, otherMap, allMaps };