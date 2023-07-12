import { Boid } from "./boids";
console.log("Sketch loaded in!");

const startSession = () => {
  const { ctx, canvas } = setupCanvas() ?? {};

  const b = new Boid();

  if (!ctx || !canvas) return;

  setCanvasBg(ctx, canvas, "lightblue");

  // outlined square X: 50, Y: 35, width/height 50
  ctx.beginPath();
  ctx.strokeRect(50, 35, 50, 50);

  // filled square X: 125, Y: 35, width/height 50
  ctx.beginPath();
  ctx.fillRect(125, 35, 50, 50);
};

function setCanvasBg(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const setupCanvas = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("bossDog");

  if (!canvas) {
    console.log("Cannot find canvas.");
    return;
  }

  return { ctx: canvas.getContext("2d"), canvas };
};

document.addEventListener("DOMContentLoaded", startSession);
