import {hoverCircleAtNearestPoint, drawCircleAtNearestPoint} from "./spin-tools.js";
import {startDrawing, draw, stopDrawing} from "./draw-tools.js";

export const StateEnum = Object.freeze({
    NONE: 'none',
    HOVERING: 'hovering',
    CIRCLE: 'circle'
});
export let state = StateEnum.NONE

export const ToolEnum = Object.freeze({
    DRAW: 'draw',
    SPIN: 'spin',
});
export let currentTool = ToolEnum.DRAW
export const canvas = document.getElementById('drawingCanvas');
export const ctx = canvas.getContext('2d');

// State change function
export function setState(newState) {
    if (Object.values(StateEnum).includes(newState)) {
        state = newState;
    } else {
        console.error('Invalid state:', newState);
    }
}

// Event listeners for buttons on top menu
const toolSquares = document.querySelectorAll('.tool-square');
toolSquares.forEach(square => {
    square.addEventListener('click', () => {
        toolSquares.forEach(sq => sq.classList.remove('selected'));
        square.classList.add('selected');

        if (square.parentElement.parentElement.id === 'drawSection') {
            currentTool = ToolEnum.DRAW;
            canvas.removeEventListener('mousemove', hoverCircleAtNearestPoint);
            canvas.removeEventListener('mousemove', drawCircleAtNearestPoint);
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
        } else if (square.parentElement.parentElement.id === 'spinSection') {
            currentTool = ToolEnum.SPIN;
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
            canvas.addEventListener('mousemove', hoverCircleAtNearestPoint);
            canvas.addEventListener('mousedown', drawCircleAtNearestPoint)
            state = StateEnum.HOVERING
        }
    });
});

// Event listeners for right side menu
const runButton = document.getElementById('runButton');
runButton.addEventListener('click', () => {
    rotateCircle();
    console.log('Run button clicked. Circle Radius:', circleRadius);
});


// Update circle radius based on slider value
const circleRadiusSlider = document.getElementById('circleRadius');
circleRadiusSlider.addEventListener('input', (e) => {
    circleRadius = parseInt(e.target.value, 10);
});

// Placeholder sliders - you can add functionality here later
const placeholder1Slider = document.getElementById('placeholder1');
placeholder1Slider.addEventListener('input', (e) => {
    // Add functionality for Placeholder 1
});

const placeholder2Slider = document.getElementById('placeholder2');
placeholder2Slider.addEventListener('input', (e) => {
    // Add functionality for Placeholder 2
});
