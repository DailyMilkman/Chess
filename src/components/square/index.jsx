import React from "react";
import "./square-style.css";
import { isLightSquare } from "../../functions";
import Piece from "../piece";
import './square-style.css'


const Square = ({ square, index, makeMove, setFromPos }) => {
    const isLight = isLightSquare(square.pos, index);
    

    const handleDrop = () => {
        makeMove(square.pos);
    };

    return (
        <div 
            className={`square ${isLight ? 'light' : 'dark'}`} 
            onDrop={handleDrop}
            onDragOver = {(e) => e.preventDefault()}
            >
            
            
            <Piece pos={square.pos} name={square.piece} setFromPos={setFromPos}/>
        </div>
    );
}

export default Square