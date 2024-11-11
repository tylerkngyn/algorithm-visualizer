export const insertionSort = array => {
    const sorted = array.slice();
    for (let i = 0; i < array.length; i++) {
        let least = sorted[i];
        let toSwap;
        for (let j = i+1; j < array.length; j++) {
            if (least > sorted[j]) {
                least = sorted[j];
                toSwap = j;
            }
        }
        if (least !== sorted[i]) {
            const temp = sorted[i];
            sorted[i] = least;
            sorted[toSwap] = temp
        }
    }
    return sorted;
}