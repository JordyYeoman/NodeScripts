import { KeyboardInput } from "./KeyboardInput";
import { Boid } from "./shapes/Boid";
import { Boid2 } from "./shapes/Boid2";
import { Ship } from "./shapes/Ship";

export class Simulation {
  boids: Boid[] | Boid2[];
  ship: Ship;
  ctx: CanvasRenderingContext2D;
  keyboardInput: KeyboardInput = new KeyboardInput();

  constructor(
    boids: Boid[] | Boid2[],
    ship: Ship,
    ctx: CanvasRenderingContext2D
  ) {
    this.boids = boids;
    this.ctx = ctx;
    this.ship = ship;
  }

  update() {
    // Loop over all boids an update their positions
    this.boids.map((boid: Boid | Boid2) => {
      boid.update();
    });
    this.ship.update(this.keyboardInput.keys);
  }

  draw() {
    this.boids.map((boid: Boid | Boid2) => {
      boid.draw();
    });
    this.ship.draw();
  }
}