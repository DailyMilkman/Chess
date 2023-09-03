import React from "react";
import './board-style.css';
import Square from '../square';



const Board = ({ squares, ...props }) => {
    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square square={square} index={index} key = {square.pos} {...props}/>
            ))}
        </div>
    );
};

export default Board