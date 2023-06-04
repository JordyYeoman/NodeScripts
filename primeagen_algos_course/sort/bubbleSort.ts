// Little notes
// A single iteration of bubble sort will always place the largest item at the end of the array
// Running time complexity is 0(n^2).

// Sort in place algo!
export const bubbleSort = (list: number[]): number[] => {
    const n = list.length;

    for(let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            let left = list[j]
            let right = list[j + 1];
            // if first number larger than second number, switch positions
            if(left > right) {
                list[j + 1] = left;
                list[j] = right;
            }
        }
    }

    return list;
}