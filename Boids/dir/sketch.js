"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boids_1 = require("./boids");
console.log("Sketch loaded in!");
const startSession = () => {
    var _a;
    const { ctx, canvas } = (_a = setupCanvas()) !== null && _a !== void 0 ? _a : {};
    const b = new boids_1.Boid();
    if (!ctx || !canvas)
        return;
    setCanvasBg(ctx, canvas, "lightblue");
    // outlined square X: 50, Y: 35, width/height 50
    ctx.beginPath();
    ctx.strokeRect(50, 35, 50, 50);
    // filled square X: 125, Y: 35, width/height 50
    ctx.beginPath();
    ctx.fillRect(125, 35, 50, 50);
};
function setCanvasBg(ctx, canvas, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
const setupCanvas = () => {
    const canvas = document.getElementById("bossDog");
    if (!canvas) {
        console.log("Cannot find canvas.");
        return;
    }
    return { ctx: canvas.getContext("2d"), canvas };
};
document.addEventListener("DOMContentLoaded", startSession);
