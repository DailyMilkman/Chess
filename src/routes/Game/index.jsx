import React, {useState, useRef, useEffect } from 'react';
import { createBoard } from '../../functions/generate-board';
import Chess  from '../../functions/chess'
import Board from "../../components/board";

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';


const Game = () => {
    const [fen, setFen] = useState(FEN);
    const [board, setBoard] = useState(createBoard(fen));
    const { current: chess } = useRef(new Chess(FEN))
    useEffect(() => {
        setBoard(createBoard(fen))
    }, [fen]);

    
    const fromPos = useRef();
    const makeMove = (pos) => {
        const from = fromPos.current;
        const to = pos;
        chess.move(from, to);

        setFen(chess.fen);
        

    }


    const setFromPos = (pos) => (fromPos.current = pos);

    return (
        <div className='game'>
            <Board squares = {board} makeMove={makeMove} setFromPos={setFromPos}/>
        </div>
    );
};

export default Game;