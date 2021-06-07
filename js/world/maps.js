const mapsFinder = {
    testMap: 1,
    otherMap: 2,
    caveTest: 3
}

const testMap = {
    id: 1,
    columns: 10,
    rows: 5,
    
    layers: [[
        // Terrains
        1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
        1.02, 1.02, 1.02, 1.02, 1.02, 1.02, 1.02, 1.02, 1.02, 1.02,
        1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
        1.01, 1.01, 1.01, 1.01, 1.01, 1.04, 1.04, 1.05, 1.04, 1.01,
        1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01
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
        map: mapsFinder.caveTest,
        text: "Entrer dans la/grotte ?",
        playerX: 1,
        playerY: .5
    }
}

const otherMap = {
    id: 2,
    columns: 4,
    rows: 3,
    
    layers: [[
        // Terrains
        1.01, 1.01, 1.01, 1.01,
        1.01, 1.01, 1.01, 1.01,
        1.01, 1.01, 1.01, 1.01
    ], [
        // Environments
        "A", "B", "O", "B",
        "O", "O", "A", "W",
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

const caveTest = {
    id: 3,
    columns: 7,
    rows: 4,
    
    layers: [[
        // Terrains
        2.02, 2.04, 2.02, 2.02, 2.02, 2.02, 2.02,
        2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01,
        2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01,
        2.01, 2.01, 2.01, 2.01, 2.01, 2.01, 2.01
    ], [
        // Environments
        "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O"
    ], [
        // Interactions
        "O", "@1", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O",
        "O", "O", "O", "O", "O", "O", "O"
    ]],

    "@1": {
        map: mapsFinder.testMap,
        text: "Sortir de la/grotte ?",
        playerX: 7,
        playerY: 3.5
    }
}

const allMaps = [testMap, otherMap, caveTest];

export { testMap, otherMap, caveTest, allMaps };