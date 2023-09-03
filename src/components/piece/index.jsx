import React, { useRef } from "react";
import PropTypes from 'prop-types';
import "./piece-styles.css";

const Piece = ({name, pos, setFromPos }) => {
    const color = name === name.toUpperCase() ? 'w' : 'b';
    const imgName = color + name.toUpperCase();
    const element = useRef();
    let img;
    
    
    try {
        img = require(`../../assets/pieces/${imgName}.png`);
    } catch (error) {
        img = require(`../../assets/pieces/empty.png`);
    }

    const handleDragStart = () => {
        setFromPos(pos);

        
         
    };

    const handleDragEnd = () => {
        element.current.style.display = 'block';
    };


    return (
        <img 
            className="piece"
            id={name}
            src={img}
            alt=""
            draggable={true}
            ref={element}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        
        />
    );
};


export default Piece;