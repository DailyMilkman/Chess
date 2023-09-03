export const isLightSquare = (pos, index) => {
    const rank = pos[1];
    if ((rank % 2 === 0) && ((index+1) % 2 !== 0)) {
        return true;
    }

    if (((index + 1) % 2 === 0) && (rank % 2 !== 0)) {
        return true;
    }

    return false
    
};