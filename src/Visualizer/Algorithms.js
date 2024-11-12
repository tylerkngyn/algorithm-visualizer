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
    let element = document.querySelector('.selectionsort-button');
    self.state.sorting = true;
    element.innerText = 'Sorting...'
    element.classList.add('button-pressed');
    const arrayBars = document.getElementsByClassName('array-bar');
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
                arrayBars[14].style.backgroundColor = 'lightgreen';
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
                }, 70)
            }
        }, i * 100)
    }
}

export const bubbleSort = (array) => {
    const sort = array.slice();
    const toRender = [];
    let stoppingPoint = sort.length-1
    
    for (let i = 0; i < sort.length-1; i++) {
        let swapped = false;
        for (let j = 0; j < stoppingPoint; j++) {
            toRender.push([j, j+1]);
            if (sort[j] > sort[j+1]) {
                swapped = true;
                let temp = sort[j];
                sort[j] = sort[j+1];
                sort[j+1] = temp;
                toRender.push([-1]);
            }
        }
        if (!swapped) {
            break;
            
        }
        toRender.push([-2]);
        stoppingPoint--;
    }
    toRender.push([-3]);
    console.log(toRender);
    return toRender;
}

export const animateBubbleSort = (self, animations) => {
    let element = document.querySelector('.bubblesort-button');
    self.state.sorting = true;
    element.innerText = 'Sorting...'
    element.classList.add('button-pressed');
    const arrayBars = document.getElementsByClassName('array-bar');
    let stoppingPoint = 14;
    for (let i = 0; i < animations.length; i++) {
        const [x, y] = animations[i];
        setTimeout( () => {
            if (animations[i] == -1) { //swap
                const [b, f] = animations[i-1];
                let temp = arrayBars[b].style.height;
                arrayBars[b].style.height = arrayBars[f].style.height;
                arrayBars[f].style.height = temp;
            }
            else if (animations[i] == -2) { //end of loop
                for (let i = stoppingPoint; i <= 14; i++) {
                    arrayBars[stoppingPoint].style.backgroundColor = 'lightgreen';
                }
                stoppingPoint--;
            }
            else if (animations[i] == -3) { //done
                for (let i = stoppingPoint; i >= 0; i--) {
                    setTimeout( () => {
                        arrayBars[i].style.backgroundColor = 'lightgreen'
                        if (i == 0) {
                            element.innerText = 'Bubble Sort'
                            element.classList.remove('button-pressed');
                            self.state.sorting = false;
                        }   
                    }, 200)
                }
            }
            else { //scanning 2 elements at a time
                arrayBars[x].style.backgroundColor = 'red';
                arrayBars[y].style.backgroundColor = 'red';
                setTimeout( () => {
                    arrayBars[x].style.backgroundColor = 'lightblue';
                    arrayBars[y].style.backgroundColor = 'lightblue';
                }, 70);
            }
        }, i * 100)
    }
    
}
