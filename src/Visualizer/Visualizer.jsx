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
            array.push(randomIntFromInterval(5, 800));
        }
        this.setState({array});
    }

    insertionSort() {
        const sortedArray = Algorithms.insertionSort(this.state.array);
        this.setState({sortedArray});
        
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
                    <button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button className="button">Sort!</button>
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