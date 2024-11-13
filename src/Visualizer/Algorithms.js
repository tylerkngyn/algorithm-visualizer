export const startAnimations = (self, className) => {
    const element = document.querySelector(className);
    self.state.sorting = true;
    element.innerText = 'Sorting...'
    element.classList.add('button-pressed');

    const otherButtons = document.querySelectorAll('.button');
    otherButtons.forEach((element) => element.classList.add('deny-press'));
}

export const endAnimations = (self, className, innerText) => {
    const element = document.querySelector(className);
    element.innerText = innerText;
    element.classList.remove('button-pressed');
    const otherButtons = document.querySelectorAll('.button');
    otherButtons[0].classList.remove('deny-press');
    self.state.sorting = false;
    self.state.sorted = true;
}

export const selectionSort = (array) => {
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
    console.log(toRender);
    return toRender;
}

export const animateSelectionSort = (self, animations) => {

    startAnimations(self, '.selectionsort-button');

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
                const [a, b] = animations[i-1];
                if (a != b) {
                    arrayBars[b].style.backgroundColor = 'lightblue';
                }
            }
            else if (x == -3) { //final bar
                arrayBars[self.state.size-1].style.backgroundColor = 'lightgreen';
                endAnimations(self, '.selectionsort-button', 'Selection Sort');
            }
            else { //scanning
                if (arrayBars[x] != arrayBars[j]) {
                    arrayBars[j].style.backgroundColor = 'black';
                }
                arrayBars[x].style.backgroundColor = 'black';
                
                let third;
                if (i != animations.length-1 && (animations[i+1] != -2) && (animations[i+1] != -3))  {
                    third = animations[i+1][2];
                }
                if ((animations[i+1] == -2) || animations[i+1] == -3) {
                    third = animations[i+2][2];
                }
            
                    if (animations[i-1] != -2 && third != r) {
                        
                        arrayBars[r].style.backgroundColor = 'lightcoral';
                        
                        setTimeout( () => {
                            arrayBars[r].style.backgroundColor = 'lightblue';
                        }, 70)
                    }
            }
        }, i * self.state.speed)
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

       stoppingPoint--;
       toRender.push([-2]);

       if (!swapped) {
        break;
       }
    }
    toRender.push([-3]);
    return toRender;
}

export const animateBubbleSort = (self, animations) => {
    
    startAnimations(self, '.bubblesort-button');

    const arrayBars = document.getElementsByClassName('array-bar');
    let stoppingPoint = self.state.size-1;
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
                for (let i = stoppingPoint; i <= self.state.size-1; i++) {
                    arrayBars[stoppingPoint].style.backgroundColor = 'lightgreen';
                }
                stoppingPoint--;
            }
            else if (animations[i] == -3) { //done
            setTimeout( () => {
                for (let toColor = stoppingPoint ; toColor >= 0 ; toColor--) {
                    setTimeout( () => {
                        arrayBars[toColor].style.backgroundColor = 'lightgreen';
                    }, 75 * toColor);
                }
               
            }, 120);
            endAnimations(self, '.bubblesort-button', 'Bubble Sort');
            
            }
            else { //scanning 2 elements at a time     
                arrayBars[x].style.backgroundColor = 'lightcoral';
                arrayBars[y].style.backgroundColor = 'lightcoral';
                   
                //prevent turning already green bars to blue
                if (animations[i+1] != -2) {
                    setTimeout( () => {
                    arrayBars[y].style.backgroundColor = 'lightblue';
                    }, 95); 
                }
                setTimeout( () => {
                    arrayBars[x].style.backgroundColor = 'lightblue';
                    }, 95); 
                }
        }, i * self.state.speed)
    }
}

export const insertionSort = (array) => {
    const sort = array.slice()
    const toRender = [];

    for (let i = 0; i < sort.length; i++) {
        for (let j = 0; j < sort.length; j++) {

        }
    }

}

export const animateInsertionSort = (self, animations) => {

}
