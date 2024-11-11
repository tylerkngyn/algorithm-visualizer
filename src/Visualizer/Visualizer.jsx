import React from 'react';
import './Visualizer.css';
import * as Algorithms from './Algorithms.js';

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 60; i++) {
            array.push(randomIntFromInterval(100, 900));
        }
        //const arrayBars = document.getElementsByClassName('array-bar');

        this.setState({array});
        console.log(array);
    }

    selectionSort() {
        const animations = Algorithms.selectionSort(this.state.array);
        console.log(animations);
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
                else if (x == -3) {
                    arrayBars[59].style.backgroundColor = 'lightgreen';
                }
                else {
                    if (arrayBars[x] != arrayBars[j]) {
                        arrayBars[j].style.backgroundColor = 'black';
                    }
                    arrayBars[x].style.backgroundColor = 'black';
                    
                    arrayBars[r].style.backgroundColor = 'red';
                
                    setTimeout( () => {
                        arrayBars[r].style.backgroundColor = 'lightblue';
                    }, 40)
                }
            }, i * 30)
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
                    <button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
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