import {state, StateEnum, ctx, canvas, setState} from './main.js'
import {distanceBetweenPoints, redrawLines} from "./canvas-tools.js";
import {points} from "./draw-tools.js";

let circleCenter = [0, 0];
let circleRadius = 0;
let theta = 0;

function findNearestPoint(x, y) {
    let nearestPoint = points[0];
    let minDistance = distanceBetweenPoints(x, y, points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        let dist = distanceBetweenPoints(x, y, points[i].x, points[i].y);
        if (dist < minDistance) {
            minDistance = dist;
            nearestPoint = points[i];
        }
    }

    return nearestPoint;
}

export function hoverCircleAtNearestPoint(e) {
    if (state !== StateEnum.HOVERING) return;
    console.log("hov")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawLines();

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (points.length > 0) {
        const nearestPoint = findNearestPoint(mouseX, mouseY);
        const centerX = (mouseX + nearestPoint.x) / 2;
        const centerY = (mouseY + nearestPoint.y) / 2;
        const radius = distanceBetweenPoints(mouseX, mouseY, nearestPoint.x, nearestPoint.y) / 2;

        circleCenter = [centerX, centerY];
        circleRadius = radius;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Function to draw a circle tangent to the line at the nearest point
export function drawCircleAtNearestPoint(e) {
    setState(StateEnum.CIRCLE);
    ctx.beginPath();
    ctx.arc(circleCenter[0], circleCenter[1], circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function rotateCircle() {
    if (state !== StateEnum.CIRCLE || points.length < 2) return;

    let index = 0;
    let previousCenter = [...circleCenter];

    const moveInterval = setInterval(() => {
        if (index >= points.length - 1) {
            clearInterval(moveInterval);
            return;
        }

        const currentPoint = points[index];
        const nextPoint = points[index + 1];
        const dx = nextPoint.x - currentPoint.x;
        const dy = nextPoint.y - currentPoint.y;
        const segmentLength = distanceBetweenPoints(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y);
        const directionX = dx / segmentLength;
        const directionY = dy / segmentLength;

        circleCenter[0] += directionX;
        circleCenter[1] += directionY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redrawLines();
        ctx.beginPath();
        ctx.arc(circleCenter[0], circleCenter[1], circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();

        const distanceMoved = distanceBetweenPoints(previousCenter[0], previousCenter[1], circleCenter[0], circleCenter[1]);
        theta += distanceMoved / circleRadius;

        previousCenter = [...circleCenter];

        if (distanceBetweenPoints(circleCenter[0], circleCenter[1], nextPoint.x, nextPoint.y) < 1) {
            index++;
        }
    }, 20);
}
