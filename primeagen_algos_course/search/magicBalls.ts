// Note: If we use binary search and jump to the middle element, but the ball breaks, 
// we then need to start at 0 and linearly move through all elements until 0.5 of n.
// Which means this is still linear time.

// Versus using the sqr root, the worst case result would be having to walk through the sqr root of n.
export const twoCrystalBalls = (breaks: boolean[]): number => {
    // Move forward by the square root of 'n'.
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));
    
    // Start i at the first jump amount
    let i = jumpAmount;
    // Move through the array by each jump amount, checking if the balls have broken yet
    for(; i < breaks.length; i+= jumpAmount) {
        if(breaks[i]) {
            break;
        }
    }

    // Once we find where the balls are broken, we walk back by the sqr root of n.
    i -= jumpAmount;

    // Now we can just linearly step through up until n until we find the lowest possible break point for both balls
    for(let j = 0; j <= jumpAmount && i < breaks.length; j++, i++) {
        if(breaks[i]) {
            return i;
        }
    }

    return -1;
}