class Square {
    constructor(pos, piece) {
        this.pos = pos;
        this.piece = piece; 
    }
}
 

export const createBoard = (fenString)  => {
    // Get the piece ordering from the fen string, and remove the unnecessary forward slashes
    const fenPieces = fenString.split(" ")[0].split("/").join("");
    
    let pieceArray = Array.from(fenPieces);

    for (let i = 0; i < pieceArray.length; i++) {
        if (!isNaN(pieceArray[i])) {
            let numberOfEmpty = parseInt(pieceArray[i]);
            let emptySquares = [];

            for (let i = 0; i < numberOfEmpty; i++) {
                emptySquares.push("");
            }

            pieceArray[i] = emptySquares;
        }
    }
    pieceArray = pieceArray.flat();

    // Generate Board Coordinates

    let ranks = [];
    for (let i = 1; i < 9; i++) {
        ranks.push(i);
    }
    
    //Replace the integers with strings and reverse the list
    ranks = ranks.map((num) => num.toString()).reverse();
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    const squares = [];
    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < files.length; j++) {
            squares.push(files[j] + ranks[i])   // [a8, b8, c8, ...]
        }
    }

    const board = [];
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        let piece = pieceArray[i];

        board.push(new Square(square, piece));
    }

    return board;
}