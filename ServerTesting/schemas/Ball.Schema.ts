export class Ball {
  width: number;
  height: number;
  velocity: number;
  friction: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.velocity = 0;
    this.friction = 9.8;
  }

  update() {
    this.velocity = this.velocity - (this.velocity * this.friction) / 100;
  }
}
