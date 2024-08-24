// make field
function drawBoard() {
    const canvas = document.getElementById("gameBoard");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        drawShape(ctx);
    } else {
        // canvas not supported
        console.log("Canvas not supported.")
    }
}



// generate random tetrominoes
// probably want to move the piece randomization to another function
// so that i can put it in hold later 
function drawShape(ctx) {
    const xValues = [0, 30, 60, 90, 120, 150, 180, 210]
    let x = xValues[Math.floor(Math.random() * 9)];
    const y = 0; // always 0 to start at top of board
    const shapes = [
        {name: "I", drawing: [[x, y, 30, 30],[x, y + 30, 30, 30],[x, y + 60, 30, 30],[x, y + 90, 30, 30],], color: "#01EDFA"},
        {name: "J", drawing: [[x + 30, y, 30, 30],[x + 30, y + 30, 30, 30],[x + 30, y + 60, 30, 30],[x, y + 60, 30, 30],], color: "#485DC5"},
        {name: "L", drawing: [[x, y, 30, 30],[x, y + 30, 30, 30],[x, y + 60, 30, 30],[x + 30, y + 60, 30, 30],], color: "#FF910C"},
        {name: "Sq", drawing: [[x, y, 30, 30],[x, y + 30, 30, 30],[x + 30, y, 30, 30],[x + 30, y + 30, 30, 30],], color: "#FEFB34"},
        {name: "BZ", drawing: [[x, y + 30, 30, 30],[x + 30, y + 30, 30, 30],[x + 30, y, 30, 30],[x + 60, y, 30, 30],], color: "#53DA3F"},
        {name: "Z", drawing: [[x +30, y + 30, 30, 30],[x + 60, y + 30, 30, 30],[x + 30, y, 30, 30],[x, y, 30, 30],], color: "#EA141C"},
        {name: "T", drawing: [[x +30, y + 30, 30, 30],[x + 60, y, 30, 30],[x + 30, y, 30, 30],[x, y, 30, 30],], color: "#DD0AB2"},
    ];

    let piece = Math.floor(Math.random() * 7);
    shapes[piece].drawing.forEach(square => {
        ctx.fillStyle = shapes[piece].color;
        ctx.strokeStyle = "#2E2E84"
        ctx.fillRect(square[0], square[1], square[2], square[3])
        ctx.strokeRect(square[0], square[1], square[2], square[3])
    });

}
// pieces:

// T: purple
// [][][]
//   []
// Z: red
// [][]
//   [][]

// move tetro from top to bottom



// when land, check for win condition

    // complete row disappears
    // blocks above completed row fall down one


// if hits top, lose


// to do later: 
// - track score
// - increase speed with level
// - hard drop


drawBoard();