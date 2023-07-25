import { Vector } from "../Vector";

// 1. Other balls should diverge away from each other and not collide
// 2.

export class BallFollow {
  pos: Vector;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mouseX = 0;
  mouseY = 0;
  maxStepDistance = 2;
  radius = 10;
  avoidDistance = 1;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.pos = new Vector(
      canvas.width / (Math.random() + 1),
      canvas.height / (Math.random() + 1),
      ctx
    );
    this.ctx = ctx;
    this.canvas = canvas;
    window.addEventListener("mousemove", (event) => {
      (this.mouseX = event.clientX), (this.mouseY = event.clientY);
    });
  }

  update(followers?: BallFollow[]) {
    // get the distance between the mouse and the ball on both axes
    // walk only the an eight of the distance to create a smooth fadeout
    let dx = (this.mouseX - this.pos.x) * 0.0125;
    let dy = (this.mouseY - this.pos.y) * 0.0125;
    // calculate the distance this would move ...
    const distance = Math.sqrt(dx * dx + dy * dy);
    //... and cap it at 5px
    if (distance > this.maxStepDistance) {
      dx *= this.maxStepDistance / distance;
      dy *= this.maxStepDistance / distance;
    }

    if (followers) {
      // Get other balls in similar distance
      const forceAwayFromOtherBalls = new Vector(0, 0, this.ctx);
      followers.forEach((ball: BallFollow) => {
        // Test distance within range of other balls
        let ballXDistanceApart = this.pos.x - ball.pos.x;
        let ballYDistanceApart = this.pos.y - ball.pos.y;
        console.log("ballXDistanceApart", ballXDistanceApart);
        const d = Math.sqrt(
          ballXDistanceApart * ballXDistanceApart +
            ballYDistanceApart * ballYDistanceApart
        );
        // console.log("d", d);
        if (d < this.avoidDistance) {
          // console.log("inside avoid distance!!");
          ballXDistanceApart *= this.maxStepDistance / d;
          ballYDistanceApart *= this.maxStepDistance / d;

          forceAwayFromOtherBalls.add(
            new Vector(-ballXDistanceApart, -ballYDistanceApart, this.ctx)
          );
        }
      });
    }

    // Update ball position
    this.pos.add(new Vector(dx, dy, this.ctx));
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos.x - this.radius,
      this.pos.y - 2 * this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
