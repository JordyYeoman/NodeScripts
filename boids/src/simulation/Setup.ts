import { Simulation } from "./Simulation";
import { Boid } from "./shapes/Boid";
import { Ship } from "./shapes/Ship";

function randomIntFromInterval(min: number, max: number) {
  const flip = Math.random() > 0.5 ? -1 : 1;
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min) * flip;
}

export const setupCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Create a spaceship for user controller
  const ship = new Ship(
    canvas.width / 2,
    canvas.height / 2,
    -10,
    0,
    0,
    0,
    5,
    ctx
  );

  // Create a bunch of boids to draw
  const boids = [];
  for (let i = 0; i < 1000; i++) {
    boids.push(
      new Boid(
        canvas.width / 2, // x
        canvas.height / 2, // y
        15, // height
        15, // width
        0, // rotation
        randomIntFromInterval(0, 10), // x velocity
        randomIntFromInterval(0, 10), // y velocity
        20, // x acceleration
        1, // y acceleration
        "#fff",
        ctx
      )
    );
  }

  const sim = new Simulation(boids, ship, ctx);

  simulationLoop(ctx, canvas, sim);
};

function simulationLoop(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  simulation: Simulation
) {
  // Draw BG
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Update elements
  simulation.update();

  // Redraw elements
  simulation.draw();

  requestAnimationFrame(() => simulationLoop(ctx, canvas, simulation));
}
