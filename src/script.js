const playBtn = document.getElementById("play");

const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
let speed = 500;
let onBoard = [];
let activePiece;

// make field
function drawBoard() {
    playBtn.style.display = "none"
    const canvas = document.getElementById("gameBoard");
    const ctx = canvas.getContext("2d");

    getTetro(ctx);
}



// generate random tetrominoes
// probably want to move the piece randomization to another function
// so that i can put it in hold later 
function getTetro(ctx) {
    let x = Math.floor(Math.random() * 9);
    x = x * CELL_WIDTH
    const y = -1 * CELL_HEIGHT; // always start pieces top board
    //might make negative to start off board 
    const tetros = [
        {name: "I", drawing: [[x, y],[x, y + CELL_HEIGHT],[x, y + 2 * CELL_HEIGHT],[x, y + 3 * CELL_HEIGHT]], color: "#01EDFA"}, //cyan
        {name: "J", drawing: [[x + CELL_WIDTH, y],[x + CELL_WIDTH, y + CELL_HEIGHT],[x + CELL_WIDTH, y + 2 * CELL_HEIGHT],[x, y + 2 * CELL_HEIGHT],], color: "#485DC5"}, // blue
        {name: "L", drawing: [[x, y],[x, y + CELL_HEIGHT],[x, y + 2 * CELL_HEIGHT],[x + CELL_WIDTH, y + 2 * CELL_HEIGHT],], color: "#FFC82E"}, // orange
        {name: "O", drawing: [[x, y],[x, y + CELL_HEIGHT],[x + CELL_WIDTH, y],[x + CELL_WIDTH, y + CELL_HEIGHT],], color: "#FEFB34"}, // yellow
        {name: "S", drawing: [[x, y],[x, y + CELL_HEIGHT],[x + CELL_WIDTH, y + CELL_HEIGHT],[x + CELL_WIDTH, y + 2 * CELL_HEIGHT],], color: "#53DA3F"}, // green
        {name: "Z", drawing: [[x + CELL_WIDTH, y],[x + CELL_WIDTH, y + CELL_HEIGHT],[x, y + CELL_HEIGHT],[x, y + 2 * CELL_HEIGHT],], color: "#FD3F59"}, // red
        {name: "T", drawing: [[x, y],[x, y + CELL_HEIGHT],[x, y + 2 * CELL_HEIGHT],[x + CELL_WIDTH, y + CELL_HEIGHT]], color: "#DD0AB2"}, // purple
    ];
    let piece = Math.floor(Math.random() * 7);
    //To Do: checkIfFilled
    // if (checkIfFilled()) {
    //     // lose game
    // } else {
        onBoard.unshift(tetros[piece])
        activePiece = setInterval(activePieceFall, speed, ctx, onBoard[0])
    // }
}

function drawShape(ctx, piece) {
    let activeShape = []; 
    ctx.fillStyle = piece.color; 
    piece.drawing.forEach(square => {
        activeShape.push([square[0], square[1]])
        ctx.fillRect(square[0], square[1], CELL_WIDTH, CELL_HEIGHT)
     });
     return activeShape;
}

// move tetro from top to bottom
function activePieceFall(ctx, piece) {
    onBoard[0].drawing.forEach(square => {
        ctx.clearRect(square[0], square[1], CELL_WIDTH, CELL_HEIGHT)
    });
    piece.drawing.forEach(square => {
        if (square[1] >= 540) {
            clearInterval(activePiece);
            //getTetro(ctx)
        }
        square[1] += CELL_HEIGHT;
    });
    drawShape(ctx, onBoard[0])
}


// when land, check for win condition

    // complete row disappears
    // blocks above completed row fall down one


// if hits top, lose


// to do later: 
// - track score
// - increase speed with level
// - hard drop

playBtn.addEventListener('click', drawBoard);
// drawBoard();