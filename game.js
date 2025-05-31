const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d"); //creating a 2d rendering contex

const pacmanAnimation = document.getElementById('animations')
const ghostAnimation = document.getElementById('ghosts')

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

let oneBlockSize = 20
let wallColor = '#342DCA'
let wallInnerColor = 'black'
let foodColour = "#FEB897"
let wallSpaceWidth = oneBlockSize / 1.6
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2
let score = 0;
let ghosts = []
let ghostCount = 4

const direction_up = 3
const direction_down = 1
const direction_left = 2
const direction_right = 4



let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
]

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let randomCornersForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize, },
];


let gameLoop = () => {
    update()
    draw()
}

let update = () => {
    pacman.process()
    pacman.eat()
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].process()
    }
}

let drawFood = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 2) {
                createRect(j * oneBlockSize + oneBlockSize / 3, i * oneBlockSize + oneBlockSize / 3, oneBlockSize / 3, oneBlockSize / 3, foodColour)
            }
        }
    }
}

let drawScore = () => {
    canvasContext.font = "46px VT323";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, 10, 495);
};

let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
}


let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, wallInnerColor)
    drawWalls()
    drawFood()
    pacman.draw()
    drawScore()
    drawGhosts()
}
let gameInterval = setInterval(gameLoop, 30)

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 1) { //Drawing a wall at (i,j) if the map cell is 1
                createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, wallColor);

                if (j > 0 && map[i][j - 1] === 1) {   //drawing a box if the block to the left is also a wall
                    createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);

                }
                if (j < map[0].length - 1 && map[i][j + 1] === 1) {  //drawing a box if the block to the right is also a wall
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor);

                }
                if (i > 0 && map[i - 1][j] === 1) {   //drawing a box if the block on top is also a wall
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);

                }
                if (i < map.length - 1 && map[i + 1][j] === 1) {    //drawing a box if the block bellow is also a wall
                    createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor);

                }
            }
        }

    }
}

let createNewPacman = () => {
    pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5);
}

let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < ghostCount; i++) {
        let startX = 9 * oneBlockSize
        let startY = 10 * oneBlockSize
        if (i % 2 === 1) {
            startX += oneBlockSize
            startY += oneBlockSize
        }
        let ghostSpeed = pacman.speed / 2

        let newGhost = new Ghost(
            startX,
            startY,
            oneBlockSize,
            oneBlockSize,
            ghostSpeed,
            ghostImageLocations[i % ghostImageLocations.length].x,
            ghostImageLocations[i % ghostImageLocations.length].y,
            124,
            116,
            6 + i

        )
        ghosts.push(newGhost)
    }
};


createNewPacman()
createGhosts()
gameLoop()

window.addEventListener("keydown", (event) => {
    let key = event.key

    setTimeout(() => {
        if (key === "ArrowLeft" || key === "a") {
            pacman.nextDirection = direction_left;

        } else if (key === "ArrowUp" || key === "w") {

            pacman.nextDirection = direction_up;
        } else if (key == "ArrowRight" || key === "d") {
            pacman.nextDirection = direction_right;
        } else if (key === "ArrowDown" || key === "s") {
            pacman.nextDirection = direction_down;
        }
    }, 1)
})