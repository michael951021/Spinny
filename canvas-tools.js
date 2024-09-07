import {ctx, canvas} from './main.js'
import {points} from "./draw-tools.js";

// Function to calculate distance between two points
export function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to redraw all lines on the canvas
export function redrawLines() {
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.beginPath();

    for (let i = 0; i < points.length; i++) {
        if (i === 0) {
            ctx.moveTo(points[i].x, points[i].y);
        } else {
            ctx.lineTo(points[i].x, points[i].y);
        }
    }

    ctx.stroke();
}
