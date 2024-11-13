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
            size: 30,
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
                array.push(randomIntFromInterval(200, 900));
            }

            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = 'lightblue';
            }

            const otherButtons = document.querySelectorAll('.button');
            otherButtons.forEach((element) => element.classList.remove('deny-press'));
            
            this.setState({array});
            this.state.sorting = false;
            this.state.sorted = false;
            console.log(array);
        }
    }

    selectionSort() {
        const animations = Algorithms.selectionSort(this.state.array);
        if (!this.state.sorting && !this.state.sorted) {
            Algorithms.animateSelectionSort(this, animations);
        }
    }

    bubbleSort() {
        const animations = Algorithms.bubbleSort(this.state.array);
        if (!this.state.sorting && !this.state.sorted) {
            Algorithms.animateBubbleSort(this, animations);
        }
    }

    insertionSort() {
        const animations = Algorithms.insertionSort(this.state.array);
        if (!this.state.sorting && !this.state.sorted) {
            Algorithms.animateInsertionSort(this, animations);
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
                    </div>
                
                ))}
                </div>
                <div className="buttons-container">
                    <button className="button" onClick={() => this.resetArray()}>Reset Data</button>
                    <button className="button selectionsort-button" onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className="button bubblesort-button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="button insertionsort-button" onClick={() => this.insertionSort()}>Insertion Sort</button>
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