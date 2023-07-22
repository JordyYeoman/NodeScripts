import { Simulation } from "./Simulation";
import { Boid } from "./shapes/Boid";
import { Boid2 } from "./shapes/Boid2";
import { Ship } from "./shapes/Ship";
import { fps } from "../../fps";
import { Ball } from "./shapes/Ball";
import { Walker } from "./shapes/Walker";
import { WalkerV2 } from "./shapes/WalkerV2";

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
  const walker2 = new WalkerV2(canvas.width / 2, canvas.height / 2, ctx);

  simulationLoop(ctx, canvas, sim, walker2);
};

function simulationLoop(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  simulation: Simulation,
  walker2: WalkerV2
) {
  // Add FPS
  fpsCounter();

  // Draw BG
  // ctx.fillStyle = "#c3c3c3";
  ctx.fillStyle = "#030303";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Update elements
  simulation.update();
  // Testing
  walker2.update();

  // Redraw elements
  simulation.draw();
  walker2.draw();

  requestAnimationFrame(() => simulationLoop(ctx, canvas, simulation, walker2));
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
