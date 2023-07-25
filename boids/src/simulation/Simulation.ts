import { KeyboardInput } from "./KeyboardInput";
import { BallFollow } from "./shapes/BallFollow";
import { Boid } from "./shapes/Boid";
import { Boid2 } from "./shapes/Boid2";
import { Ship } from "./shapes/Ship";
import { Walker } from "./shapes/Walker";

export class Simulation {
  boids: Boid[] | Boid2[] = [];
  walkers: Walker[] = [];
  followers: BallFollow[];
  ship: Ship;
  ctx: CanvasRenderingContext2D;
  keyboardInput: KeyboardInput = new KeyboardInput();

  constructor(
    boids: Boid[] | Boid2[],
    walkers: Walker[],
    ship: Ship,
    followers: BallFollow[],
    ctx: CanvasRenderingContext2D
  ) {
    this.boids = boids;
    this.walkers = walkers;
    this.ctx = ctx;
    this.ship = ship;
    this.followers = followers;
  }

  update() {
    // Loop over all boids an update their positions
    this.boids.map((boid: Boid | Boid2) => {
      boid.update();
    });
    // this.walkers.map((w: Walker) => {
    //   w.update();
    // });
    this.ship.update(this.keyboardInput.keys);
    this.followers.forEach((f: BallFollow) => {
      f.update(this.followers);
    });
  }

  draw() {
    this.boids.map((boid: Boid | Boid2) => {
      boid.draw();
    });
    this.followers.forEach((f: BallFollow) => {
      f.draw();
    });
    // this.walkers.map((w: Walker) => {
    //   w.draw();
    // });
    this.ship.draw();
  }
}
