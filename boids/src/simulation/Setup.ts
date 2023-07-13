import { Simulation } from "./Simulation";
import { Boid } from "./shapes/Boid";
import { Ship } from "./shapes/Ship";

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
      new Boid(canvas.width / 2, canvas.height / 2, 5, 5, 1, "#fff", ctx)
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
