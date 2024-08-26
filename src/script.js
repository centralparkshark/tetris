const playBtn = document.getElementById("play");

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;
let speed = 500;
let onBoard = [];
let activePiece;

// make field
function drawBoard() {
    playBtn.style.display = "none"
    getTetro();
}



// generate random tetrominoes
// probably want to move the piece randomization to another function
// so that i can put it in hold later 
function getTetro() {
    let x = Math.floor(Math.random() * 9);
    x = x * CELL_WIDTH
    const y = -3 * CELL_HEIGHT; // always start pieces top board
    //might make negative to start off board 
    const tetros = [
        {name: "I", drawing: [{x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 4}], maxWidth: 1, color: "#01EDFA"},
        {name: "J", drawing: [{x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 3}, {x: x + CELL_WIDTH, y: y, width: CELL_WIDTH, height: CELL_HEIGHT}], maxWidth: 2, color: "#485DC5"}, // blue
        {name: "L", drawing: [{x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT}, {x: x + CELL_WIDTH, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 3}], maxWidth: 2, color: "#FFC82E"}, // orange
        {name: "O", drawing: [{x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 2}, {x: x + CELL_WIDTH, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 2}], maxWidth: 2, color: "#FEFB34"}, // yellow
        {name: "S", drawing: [{x: x, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 2}, {x: x + CELL_WIDTH, y: y + CELL_HEIGHT, width: CELL_WIDTH, height: CELL_HEIGHT * 2}], maxWidth: 2, color: "#53DA3F"}, // green
        {name: "Z", drawing: [{x: x, y: y + CELL_HEIGHT, width: CELL_WIDTH, height: CELL_HEIGHT * 2}, {x: x + CELL_WIDTH, y: y, width: CELL_WIDTH, height: CELL_HEIGHT * 2}], maxWidth: 2, color: "#FD3F59"}, // red
        {name: "T", drawing: [{x: x, y: y + CELL_HEIGHT * 2, width: CELL_WIDTH, height: CELL_HEIGHT}, {x: x + CELL_WIDTH, y: y + CELL_HEIGHT, width: CELL_WIDTH, height: CELL_HEIGHT * 3}], maxWidth: 2, color: "#DD0AB2"}, // purple
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
    ctx.fillStyle = piece.color; 
    piece.drawing.forEach(square => {
        ctx.fillRect(square.x, square.y, square.width, square.height)
     });
}

// move tetro from top to bottom
function activePieceFall(ctx, piece) {
    onBoard[0].drawing.forEach(square => {
        ctx.clearRect(square.x, square.y, square.width, square.height)
    });
    piece.drawing.forEach(square => {
        if (square.y >= 540 || checkForCollision(piece)) {
            clearInterval(activePiece);
            setTimeout(getTetro, 500)
        }
        square.y += CELL_HEIGHT;
    });
    drawShape(ctx, onBoard[0])
}

// listen for keypresses
function arrowPress(e) {
    let widthBlocks = onBoard[0].drawing.length
    if (e.key == "ArrowRight" && onBoard[0].drawing[onBoard[0].maxWidth - 1].x >= CELL_WIDTH * 9) {
        // do nothing
    } else if (e.key == "ArrowLeft" && onBoard[0].drawing[0].x <= 0) {
        // do nothing
    } else {
        onBoard[0].drawing.forEach(square => {
            ctx.clearRect(square.x, square.y, square.width, square.height)
            if (e.key == "ArrowRight") {
                if (square.x < CELL_WIDTH * 9) {
                    square.x += CELL_WIDTH
                }
            } else if (e.key == "ArrowLeft") {
                if (square.x > 0) {
                    square.x -= CELL_WIDTH
                }
            } else if (e.key == "ArrowDown") {
                console.log("hard drop")
            } else if (e.key == "ArrowUp") {
                console.log("rotate")
            }
        })
    }
    drawShape(ctx, onBoard[0])
}

// sees if hitting other piece while moving down
function checkForCollision(piece) {

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
window.addEventListener('keydown', arrowPress)
drawBoard();