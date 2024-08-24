const canvas = document.getElementById("gameBoard");
let speed = 100;
let onBoard = [];
let activePiece;

// make field
function drawBoard() {
    let xIndex = 0;
    let yIndex = -1;
    for (let i = 0; i < 200; i++) {
        if (yIndex != 0) {
            if (yIndex % 9 == 0) {
                xIndex++;
                yIndex = -1;
            }
        }
        yIndex++;
        const div = document.createElement("div");
        div.id = [xIndex, yIndex];
        div.setAttribute("filled", false)
        canvas.appendChild(div);
    }
    //getTetro();
}



// generate random tetrominoes
// probably want to move the piece randomization to another function
// so that i can put it in hold later 
function getTetro() {
    let x = Math.floor(Math.random() * 9);
    const y = 0; // always 0 to start at top of board
    //might make negative to start off board 
    const tetros = [
        {name: "I", drawing: [[x, y],[x, y + 1],[x, y + 2],[x, y + 3]], color: "#01EDFA"}, //cyan
        {name: "J", drawing: [[x + 1, y],[x + 1, y + 1],[x + 1, y + 2],[x, y + 2],], color: "#485DC5"}, // blue
        {name: "L", drawing: [[x, y],[x, y + 1],[x, y + 2],[x + 1, y + 2],], color: "#FFC82E"}, // orange
        {name: "O", drawing: [[x, y],[x, y + 1],[x + 1, y],[x + 1, y + 1],], color: "#FEFB34"}, // yellow
        {name: "S", drawing: [[x, y],[x, y + 1],[x + 1, y + 1],[x + 1, y + 2],], color: "#53DA3F"}, // green
        {name: "Z", drawing: [[x + 1, y],[x + 1, y + 1],[x, y+1],[x, y+2],], color: "#FD3F59"}, // red
        {name: "T", drawing: [[x, y],[x, y + 1],[x, y + 2],[x + 1, y + 1]], color: "#DD0AB2"}, // purple
    ];

    let piece = Math.floor(Math.random() * 7);
    //To Do: checkIfFilled
    // if (checkIfFilled()) {
    //     // lose game
    // } else {
        onBoard.push(activePiece)
        activePiece = setInterval(activePieceFall, speed, tetros[piece])
    // }
}

function drawShape(piece) {
     piece.drawing.forEach(square => {
        let eachBlock = document.getElementById(`${square[1]},${square[0]}`);
        eachBlock.style.backgroundColor=piece.color;
        eachBlock.setAttribute("filled", true)
     });
}

// move tetro from top to bottom
function activePieceFall(piece) {
    piece.drawing.forEach(square => {
        // clear square
        let prevBlock = document.getElementById(`${square[1]},${square[0]}`);
        prevBlock.style.backgroundColor="transparent";
        prevBlock.setAttribute("filled", false)
        square[1]++; 
        drawShape(piece);
        if (square[1] >= 19) {
            clearInterval(activePiece)
            getTetro();
        }
    });
}


// when land, check for win condition

    // complete row disappears
    // blocks above completed row fall down one


// if hits top, lose


// to do later: 
// - track score
// - increase speed with level
// - hard drop


drawBoard();