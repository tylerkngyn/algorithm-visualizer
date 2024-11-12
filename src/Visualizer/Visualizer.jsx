import React from 'react';
import './Visualizer.css';
import * as Algorithms from './Algorithms.js';

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sorting: false,
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        if (!this.state.sorting) {
            const array = [];
            for (let i = 0; i < 60; i++) {
                array.push(randomIntFromInterval(100, 900));
            }

            const arrayBars = document.getElementsByClassName('array-bar');
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = 'lightblue';
            }
            
            this.setState({array});
            this.state.sorting = false;
            console.log(array);
        }
    }

    selectionSort() {
        const animations = Algorithms.selectionSort(this.state.array);
        let element = document.querySelector('.selectionsort-button');
        if (!this.state.sorting) {
            this.state.sorting = true;
            element.innerText = 'Sorting...'
            element.classList.add('button-pressed');
            
            Algorithms.animateSelectionSort(this, animations);
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
                    <button className="button">Bubble Sort</button>
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