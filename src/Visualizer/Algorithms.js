
export const selectionSort = array => {
    const sorted = array.slice();
    const toRender = [];
    
    for (let i = 0; i < array.length - 1; i++) {
        let least = sorted[i];
        let leastIndex = i;
        let toSwap;
        toRender.push([i, leastIndex, i+1])
        for (let j = i+1; j < array.length; j++) {
            if (least > sorted[j]) {
                least = sorted[j];
                leastIndex = j;
                toSwap = j;
                toRender.push([-2])
            }
            toRender.push([i, leastIndex, j])
        }
        if (least !== sorted[i]) {
            const temp = sorted[i];
            sorted[i] = least;
            sorted[toSwap] = temp
        }
        toRender.push([-1]);
    }

    toRender.push([-3]);
    return toRender;
}

export const animateSelectionSort = (self, animations) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    let finish = false;
    for (let i = 0; i < animations.length; i++) {
        setTimeout( () => {
            const [x, j, r] = animations[i];
            
            if (x == -1) { //first element is sorted
                const [x, j] = animations[i-1];
                if (x == j) { //if x is least
                    arrayBars[x].style.backgroundColor = 'lightgreen';
                }
                else { //if x is not least
                    const temp = arrayBars[x].style.height;
                    arrayBars[x].style.backgroundColor = 'lightgreen';
                    arrayBars[j].style.backgroundColor = 'lightblue';
                    arrayBars[x].style.height = arrayBars[j].style.height;
                    arrayBars[j].style.height = temp;
                }
            }
            else if (x == -2) { //new least has been identified
                const [x, j] = animations[i-1];
                if (x != j) {
                    arrayBars[j].style.backgroundColor = 'lightblue';
                }
            }
            else if (x == -3) { //final bar
                arrayBars[59].style.backgroundColor = 'lightgreen';
                finish = true;
                const element = document.querySelector('.selectionsort-button');
                element.innerText = 'Selection Sort'
                element.classList.remove('button-pressed');
                self.state.sorting = false;
            }
            else { //scanning
                if (arrayBars[x] != arrayBars[j]) {
                    arrayBars[j].style.backgroundColor = 'black';
                }
                arrayBars[x].style.backgroundColor = 'black';
                
                arrayBars[r].style.backgroundColor = 'red';
            
                setTimeout( () => {
                    arrayBars[r].style.backgroundColor = 'lightblue';
                }, 40)
            }
        }, i * 40)
    }
}

/*
export const selectionSortPromise = (animations) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const animated = true;
            animateSelectionSort(animations);
            if (animated) {
                resolve('Done');
            }
        }, 10);        
    });
}
*/
