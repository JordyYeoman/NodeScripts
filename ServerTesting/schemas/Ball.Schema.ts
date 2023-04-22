import { Schema, type } from '@colyseus/schema';

// class Ball extends Schema {
//   @type('number') x: number;
//   @type('number') y: number;
//   @type('number') angle: number;
//   @type('number') velocityX: number;
//   @type('number') velocityY: number;

//   // constructor() {
//   //   super();
//   //   this.x = 0;
//   //   this.y = 0;
//   //   this.angle = 0;
//   //   this.velocityX = 0;
//   //   this.velocityY = 0;
//   // }
// }

export class MyState extends Schema {
  @type('string') currentTurn: string = '';
}

// defineTypes(Ball, {
//   x: 'number',
//   y: 'number',
//   angle: 'number',
//   velocityX: 'number',
//   velocityY: 'number',
// });
