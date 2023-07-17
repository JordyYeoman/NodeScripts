import { Simulation } from "./Simulation";
import { Boid } from "./shapes/Boid";
import { Boid2 } from "./shapes/Boid2";
import { Ship } from "./shapes/Ship";
import { fps } from "../../fps";
import { Ball } from "./shapes/Ball";
import { Walker } from "./shapes/Walker";

function randomIntFromInterval(min: number, max: number) {
  const flip = Math.random() > 0.5 ? -1 : 1;
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min) * flip;
}

export const setupCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });

  if (!ctx) return;

  // Create a spaceship for user controller
  const ship = new Ship(canvas.width / 2, canvas.height / 2, 5, ctx);

  // Create a bunch of boids to draw
  const boids = [];
  for (let i = 0; i < 10; i++) {
    boids.push(
      new Boid2(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        10,
        15,
        ctx
      )
    );
  }
  // Create a bunch of random walkers
  const walkers = [];
  for (let i = 0; i < 1; i++) {
    walkers.push(
      new Walker(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        15,
        20,
        ctx,
        canvas
      )
    );
  }

  // const w = new Walker(canvas.width / 2, canvas.height / 2, ctx);
  const sim = new Simulation([], walkers, ship, ctx);

  simulationLoop(ctx, canvas, sim);
};

function simulationLoop(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  simulation: Simulation
) {
  // Add FPS
  fpsCounter();

  // Draw BG
  ctx.fillStyle = "#c3c3c3";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Update elements
  simulation.update();

  // Redraw elements
  simulation.draw();

  requestAnimationFrame(() => simulationLoop(ctx, canvas, simulation));
}

function fpsCounter() {
  // set FPS calulation based in the last 120 loop cicles
  fps.sampleSize = 120;

  const fpsValue = fps.tick();
  // Update html element
  const fpsEl = document.getElementById("fps");

  if (!fpsEl) return;

  fpsEl.innerHTML = fpsValue.toString();
}
