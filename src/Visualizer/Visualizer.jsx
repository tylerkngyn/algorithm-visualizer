import React from 'react';
import './Visualizer.css';
import * as Algorithms from './Algorithms.js';

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sorting: false,
            sorted: false,
            size: 40,
            speed: 50
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        if (!this.state.sorting) {
            const array = [];
            
            for (let i = 0; i < this.state.size; i++) {
            array.push((randomIntFromInterval(0, 40) * 20) + 20);
            }
            
            const arrayBars = document.getElementsByClassName('array-bar'); //heights, colors, innertext all changed
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = 'lightblue'; //color back
                arrayBars[i].innerHTML = `<p class="value-text">${array[i]}</p>` //inner text is back
                arrayBars[i].style.height = `${array[i]}px`;
            }

            const otherButtons = document.querySelectorAll('.button');
            otherButtons.forEach((element) => element.classList.remove('deny-press'));
            
            this.setState({array});
            this.state.sorting = false;
            this.state.sorted = false;
            console.log(array);
        }
    }

    /*
    redoArray() {
        if (!this.state.sorting && this.state.sorted) {
            const array = this.state.array.slice();
            console.log(array);
            
            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = 'lightblue';
                arrayBars[i].style.height = `${array[i]}px`;
                arrayBars[i].innerHTML = `<p class="value-text">${array[i]}</p>`
            }

            const otherButtons = document.querySelectorAll('.button');
            otherButtons.forEach((element) => element.classList.remove('deny-press'));

            
            this.state.sorting = false;
            this.state.sorted = false;
        }
    }
    */

    selectionSort() {
        if (!this.state.sorting && !this.state.sorted) {
            const animations = Algorithms.selectionSort(this.state.array);
            Algorithms.animateSelectionSort(this, animations);
        }
    }

    bubbleSort() {
        if (!this.state.sorting && !this.state.sorted) {
            const animations = Algorithms.bubbleSort(this.state.array);
            Algorithms.animateBubbleSort(this, animations);
        }
    }

    insertionSort() {
        if (!this.state.sorting && !this.state.sorted) {
            const animations = Algorithms.insertionSort(this.state.array);
            Algorithms.animateInsertionSort(this, animations);
        }
    }

    mergeSort() {
        if (!this.state.sorting && !this.state.sorted) {
            const animations = Algorithms.masterMergeSort(this.state.array);
            Algorithms.animateMergeSort(this, animations);
        }
    }

    quickSort() {
        if (!this.state.sorting && !this.state.sorted) {
            const animations = Algorithms.masterQuickSort(this.state.array);
            Algorithms.animateQuickSort(this, animations);
        }
    }
    

    render() {
        const {array} = this.state;

        return (
            <>
            <h1 class="title">Algorithm Visualizer</h1>
            <div className="master-container">
                <div className="array-container">
                {array.map((value, idx) => (
                
                    <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${value}px`}}>
                        <p className="value-text">{value}</p>
                    </div>
                
                ))}
                </div>
                <div className="buttons-container">
                    <button className="button" onClick={() => this.resetArray()}>Reset Data</button>
                   {/* <button className="button redoarray-button" onClick={() => this.redoArray()}>Redo Array</button> */}
                    <button className="button selectionsort-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="button bubblesort-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="button insertionsort-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button className="button mergesort-button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button quicksort-button" onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
            </div>
            </>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1);
}

export default Visualizer