export const startAnimations = (self, className) => {
    const element = document.querySelector(className);
    self.state.sorting = true;
    element.innerText = 'Sorting...'

    const otherButtons = document.querySelectorAll('.button');
    otherButtons.forEach((element) => element.classList.add('deny-press'));

    element.classList.add('button-pressed');
}

export const endAnimations = (self, className, innerText) => {
    const element = document.querySelector(className);
    element.innerText = innerText;
    element.classList.remove('button-pressed');
    const otherButtons = document.querySelectorAll('.button');
    otherButtons[0].classList.remove('deny-press');
    //otherButtons[1].classList.remove('deny-press');
    self.state.sorting = false;
    self.state.sorted = true;
}

export const animateSwapBars = (barOne, barTwo) => {
    const arrayBars = document.getElementsByClassName('array-bar');
    let temp = arrayBars[barOne].style.height;
    arrayBars[barOne].style.height = arrayBars[barTwo].style.height;
    arrayBars[barTwo].style.height = temp;
    temp = arrayBars[barOne].innerHTML;
    arrayBars[barOne].innerHTML = arrayBars[barTwo].innerHTML;
    arrayBars[barTwo].innerHTML = temp;
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
                    arrayBars[x].style.backgroundColor = 'lightgreen';
                    arrayBars[j].style.backgroundColor = 'lightblue';
                    animateSwapBars(x, j);
                }
            }
            else if (x == -2) { //new least has been identified
                const [a, b] = animations[i-1];
                if (a != b) {
                    arrayBars[b].style.backgroundColor = 'lightblue';
                }
            }
            else if (x == -3) { //final bar
                setTimeout( () => {
                    arrayBars[self.state.size-1].style.backgroundColor = 'lightgreen';
                }, 120)
                endAnimations(self, '.selectionsort-button', 'Selection Sort');
            }
            else { //scanning
                if (arrayBars[x] != arrayBars[j]) {
                    arrayBars[j].style.backgroundColor = 'lightgray';
                }
                arrayBars[x].style.backgroundColor = 'lightgray';
               
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
                    }, 50)
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
                animateSwapBars(b, f);
            }
            else if (animations[i] == -2) { //end of loop
                setTimeout( () => {
                    for (let i = stoppingPoint; i <= self.state.size-1; i++) {
                        arrayBars[stoppingPoint].style.backgroundColor = 'lightgreen';
                    }
                    stoppingPoint--;
                }, 120)
            }
            else if (animations[i] == -3) { //sorting done
                setTimeout( () => {
                    for (let toColor = stoppingPoint ; toColor >= 0 ; toColor--) {
                        setTimeout( () => {
                            arrayBars[toColor].style.backgroundColor = 'lightgreen';
                        }, toColor * self.state.speed);
                    }
                }, 120)
                endAnimations(self, '.bubblesort-button', 'Bubble Sort');
            }
            else { //scanning 2 elements at a time     
                arrayBars[x].style.backgroundColor = 'lightcoral';
                arrayBars[y].style.backgroundColor = 'lightcoral';
                   
                //prevent turning already green bars to blue
                if (animations[i+1] != -2) {
                    setTimeout( () => {
                    arrayBars[y].style.backgroundColor = 'lightblue';
                    }, 50); 
                }
                setTimeout( () => {
                    arrayBars[x].style.backgroundColor = 'lightblue';
                    }, 50); 
                }
        }, i * self.state.speed)
    }
}

export const insertionSort = (array) => {
    const sort = array.slice()
    const toRender = [];

    for (let i = 0; i < sort.length; i++) {
        let j = i;
       
        while (j > 0 && (sort[j] < sort[j-1])) {
            toRender.push([i, j, j-1]);
            toRender.push([-1]);
            let temp = sort[j];
            sort[j] = sort[j-1];
            sort[j-1] = temp;
            j = j-1;
        }
        
        toRender.push([-2]);

    }
    toRender.push([-3]);
    return toRender;
}

export const animateInsertionSort = (self, animations) => {
    startAnimations(self, '.insertionsort-button');

    const arrayBars = document.getElementsByClassName('array-bar');
    let green = 0;
    for (let i = 0; i < animations.length; i++) {
        const [a, b, c] = animations[i];
        setTimeout( () => {
            if (animations[i] == -1) { //there is a swap
            const [a, b, c] = animations[i-1];
            animateSwapBars(b,c);  
            }
            else if (animations[i][0] == -2) { //there was no swap
                if (green <= self.state.size-1) {
                    arrayBars[green].style.backgroundColor = 'lightgreen';
                    if (green != 0) {
                        arrayBars[green-1].style.backgroundColor = 'lightblue';
                    }
                    green++;
                }
            }
            else if (animations[i] == -3) { //done sorting
                //arrayBars[self.state.size-1].style.backgroundColor = 'lightgreen';
                for (let j = 0; j < self.state.size-1; j++) {
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = 'lightgreen';
                    }, j * self.state.speed)
                }
                endAnimations(self, '.insertionsort-button', 'Insertion Sort');
            }
            else { //scanning
                arrayBars[a].style.backgroundColor = 'lightgreen';
                arrayBars[b].style.backgroundColor = 'lightcoral';
                arrayBars[c].style.backgroundColor = 'lightcoral';
                
                setTimeout(() => {
                    arrayBars[b].style.backgroundColor = 'lightblue';
                    arrayBars[c].style.backgroundColor = 'lightblue';
                    }, 50);
            }
        }, i * self.state.speed);
    }
}

export const masterMergeSort = (array) => {
    const toRender = [];
    const copy = array.slice();

    secondaryMergeSort(array, 0, array.length-1, copy, toRender);
    toRender.push([-2]);
    return toRender;
}

export const secondaryMergeSort = (array, start, end, copy, animations) => {
    if (start == end) return;
    const mid = Math.floor((start + end) / 2);

    secondaryMergeSort(copy, start, mid, array, animations);
    secondaryMergeSort(copy, mid+1, end, array, animations);
    merge(array, start, mid, end, copy, animations);
}

export const merge = (array, start, middle, end, copy, animations) => {
    let mainIndex = start;
    let leftIndex = start;
    let rightIndex = middle+1;
    while (leftIndex <= middle && rightIndex <= end) {
        //comparing values
        animations.push([leftIndex, rightIndex]);

        if (copy[leftIndex] <= copy[rightIndex]) {
            //replacing value of the main array
            animations.push([-1, mainIndex, copy[leftIndex]]);
            array[mainIndex] = copy[leftIndex];
            leftIndex++;
        }
        else {
            //replacing value of the main array
            animations.push([-1, mainIndex, copy[rightIndex]]);
            array[mainIndex] = copy[rightIndex];
            rightIndex++;
        }
        mainIndex++;
    }

    while (leftIndex <= middle) {
        //comparing values
        animations.push([leftIndex, leftIndex]);

        //replacing value of the main array
        animations.push([-1, mainIndex, copy[leftIndex]]);
        array[mainIndex] = copy[leftIndex];
        mainIndex++;
        leftIndex++;
        
    }

    while (rightIndex <= end) {
        //comparing values
        animations.push([rightIndex, rightIndex]);

        //replacing value of the main array
        animations.push([-1, mainIndex, copy[rightIndex]]);
        array[mainIndex] = copy[rightIndex];
        mainIndex++;
        rightIndex++;
    } 
}

export const animateMergeSort = (self, animations) => {
    startAnimations(self, '.mergesort-button')
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        setTimeout( () => {
            if (animations[i][0] == -1) {
                const [x, y, z] = animations[i];
                arrayBars[y].style.height = `${z}px`
                arrayBars[y].innerHTML = `<p class="value-text">${z}</p>` 
            }
            else if (animations[i][0] == -2) {
                for (let j = 0; j < self.state.size; j++) {
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = 'lightgreen';
                    }, j * self.state.speed)
                }
                endAnimations(self, '.mergesort-button', 'Merge Sort');
            }
            else {
                const [x, y] = animations[i];
                arrayBars[x].style.backgroundColor = 'lightcoral';
                arrayBars[y].style.backgroundColor = 'lightcoral';
                //prevents recoloring bars
                if (animations[i+1][0] == -1) {
                    if (animations[i+2][0] != x) {
                        setTimeout( () => {
                            arrayBars[x].style.backgroundColor = 'lightblue';
                        }, 50)
                    }
                    if (animations[i+2][1] != y) {
                        setTimeout( () => {
                            arrayBars[y].style.backgroundColor = 'lightblue';
                        }, 50)
                    }
                }
            }
        }, i * self.state.speed);
    }
}

export const masterQuickSort = (array) => {
    const toRender = []

    quickSort(array, 0, array.length-1, toRender);

    toRender.push([-2]);
    console.log(toRender);
    return toRender;

}
 
export const quickSort = (array, start, end, animations) => {
    if (end <= start) return;

    const pivot = findPivot(array, start, end, animations);
    quickSort(array, start, pivot - 1, animations);
    quickSort(array, pivot + 1, end, animations);

}

export const findPivot = (array, start, end, animations) => {
    const pivot = array[end];
    let i = start - 1;

    for (let j = start; j <= end; j++) {
        if (i < 0) {
            animations.push([end, j, j]);
        }
        else {
            animations.push([end, i, j]);
        }

        if (array[j] < pivot) {
            i++;
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            
            animations.push([-1, i, j]);
        }
    }

    i++;
    const temp = array[i];
    array[i] = pivot;
    array[end] = temp;
    animations.push([-1, i, end]);

    return i;
}

export const animateQuickSort = (self, animations) => {
    startAnimations(self, '.quicksort-button');
    const arrayBars = document.getElementsByClassName('array-bar');

    
    for (let i = 0; i < animations.length; i++) {
        setTimeout( () => {
            if (animations[i][0] == -1) {
                const [x, y, z] = animations[i];
                animateSwapBars(y, z);
            }
            else if (animations[i][0] == -2) {
                for (let j = 0; j < self.state.size; j++) {
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = 'lightgreen';
                    }, j * self.state.speed)
                }
                endAnimations(self, '.quicksort-button', 'Quick Sort');
            }
            else {
                const [x, y, z] = animations[i];
                arrayBars[x].style.backgroundColor = 'lightgreen';
                arrayBars[y].style.backgroundColor = 'lightcoral';
                arrayBars[z].style.backgroundColor = 'lightcoral';
  
                //prevents recoloring bars
                if (animations[i+1][0] == -1) {
                    if (animations[i+2][1] != y) {
                        setTimeout( () => {
                            arrayBars[y].style.backgroundColor = 'lightblue';
                            //arrayBars[z].style.backgroundColor = 'lightblue';
                        }, 50)
                    } 
                }
                setTimeout( () => {
                    arrayBars[z].style.backgroundColor = 'lightblue';
                }, 50) 
            }
        }, i * self.state.speed)
    }
}
