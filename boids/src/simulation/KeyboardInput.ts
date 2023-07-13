export class KeyboardInput {
  keys: { [key: string]: boolean };

  constructor() {
    this.keys = {};

    addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp") {
        this.keys[e.key] = true;
      }
      if (e.code === "ArrowDown") {
        this.keys[e.key] = true;
      }
      if (e.code === "ArrowLeft") {
        this.keys[e.key] = true;
      }
      if (e.code === "ArrowRight") {
        this.keys[e.key] = true;
      }
    });

    addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp") {
        this.keys[e.key] = false;
      }
      if (e.code === "ArrowDown") {
        this.keys[e.key] = false;
      }
      if (e.code === "ArrowLeft") {
        this.keys[e.key] = false;
      }
      if (e.code === "ArrowRight") {
        this.keys[e.key] = false;
      }
    });
  }
}
