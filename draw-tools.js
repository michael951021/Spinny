let drawing = false;
export let points = [];
import {currentTool, ToolEnum, ctx, canvas} from './main.js'

export function startDrawing(e) {
    if (currentTool === ToolEnum.DRAW) {
        drawing = true;
        points.push({ x: e.offsetX, y: e.offsetY });
        ctx.moveTo(e.offsetX, e.offsetY);  // Set the initial position
    }
}

export function draw(e) {
    if (!drawing || currentTool !== ToolEnum.DRAW) return;

    let startX = ctx.currentX || e.offsetX;
    let startY = ctx.currentY || e.offsetY;
    const dx = Math.abs(e.offsetX - startX);
    const dy = Math.abs(e.offsetY - startY);
    const sx = (startX < e.offsetX) ? 1 : -1;
    const sy = (startY < e.offsetY) ? 1 : -1;
    let err = dx - dy;

    while (!(startX === e.offsetX && startY === e.offsetY)) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        ctx.lineTo(startX, startY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        points.push({ x: startX, y: startY });

        const e2 = err * 2;
        if (e2 > -dy) {
            err -= dy;
            startX += sx;
        }
        if (e2 < dx) {
            err += dx;
            startY += sy;
        }
    }

    ctx.currentX = e.offsetX;
    ctx.currentY = e.offsetY;
}

export function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}
