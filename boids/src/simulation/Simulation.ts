import { Boid } from "./shapes/Boid";

export class Simulation {
  boids: Boid[];
  ctx: CanvasRenderingContext2D;

  constructor(boids: Boid[], ctx: CanvasRenderingContext2D) {
    this.boids = boids;
    this.ctx = ctx;
  }

  update() {
    // Loop over all boids an update their positions
    this.boids.map((boid: Boid) => {
      boid.update();
    });
  }

  draw() {
    this.boids.map((boid: Boid) => {
      boid.draw();
    });
  }
}
