import { createBoard } from "./generate-board";

class Chess {
    constructor(FEN) {
        this.fen = FEN
        this.board = createBoard(FEN)
        this.fileValues = {'a':0, 'b':1, 'c':2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7}
    }

    move(from, to) {
       let fromSquare = this.findSquare(from)
       let toSquare = this.findSquare(to)

       
       this.board[toSquare].piece = this.board[fromSquare].piece
       this.board[fromSquare].piece = ''

       this.updateFen(from, to);
       

    }

    findSquare(coord) {
        let lst = coord.split('');
        let rankOffset = (8 - parseInt(lst[1])) * 8
        let fileOffset = this.fileValues[lst[0]] 
        
        
        let squareIndex = fileOffset + rankOffset
        return squareIndex
    }
    
    updateFen(from, to) {
        let fenArray = this.fen.split(" ")[0].toString().split("/")
        let fromIndex = 8 - parseInt(from.charAt(1))
        let fromFen = fenArray[fromIndex];

        fromFen = this.expandSubFen(fromFen)

        let piece = fromFen[this.fileValues[from.charAt(0)]]

        fromFen[this.fileValues[from.charAt(0)]] = '1'


        // Update the 'to' position
        let toIndex = 8 - parseInt(to.charAt(1))
        let toFen;
        if (toIndex === fromIndex) {
            toFen = fromFen
        }
        else {
            toFen = fenArray[toIndex];
        }
        toFen = this.expandSubFen(toFen)
        toFen[this.fileValues[to.charAt(0)]] = piece

        

        fromFen = this.condenseSubFen(fromFen)
        toFen = this.condenseSubFen(toFen)


        fenArray[fromIndex] = fromFen;
        fenArray[toIndex] = toFen;

        fenArray = fenArray.join('/');
        console.log(fenArray)
        let fenCopy = this.fen.split(' ');
        fenCopy[0] = fenArray;
        this.fen = fenCopy.join(' ');

    }

    expandSubFen(subStringFen) {
        let subFen = Array.from(subStringFen);
        let one = '1'
        for (let i = 0; i < subFen.length; i++) {
            if (!isNaN(subFen[i])) {
                let emptyAmount = parseInt(subFen[i])
                subFen[i] = [one.repeat(emptyAmount)]
            }
        }
        subFen = subFen.flat().join('').split('')

        return subFen
    }

    condenseSubFen(subFenlst) {
        let newSubFen = ''
        let count = 0;
        for (let i = 0; i < subFenlst.length; i++) {
            if ((subFenlst[i]) === '1') {
                count++
            }
            else if (count !== 0) {
                newSubFen += count.toString();
                newSubFen += subFenlst[i]
                count = 0
            }
            else {
                newSubFen += subFenlst[i]
            }
        }

        if (count !== 0) {
            newSubFen += count.toString();
        }
        return newSubFen
    }
}

export default Chess