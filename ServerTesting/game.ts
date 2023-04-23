import { Ball } from './schemas/Ball.Schema';

console.log('Hello World');

const getRandomNumber = () => {
  return parseFloat((Math.random() * 10).toFixed(2));
};

function gameLoop() {
  // Create 20 ball instances
  const ballParty = [];
  for (let i = 0; i < 20; i++) {
    ballParty.push(new Ball(getRandomNumber(), getRandomNumber()));
  }

  console.log('Game looping');
  console.log('Ball pit state', ballParty);
}

setTimeout(() => {
  console.log('Systems starting...');
  gameLoop();
}, 100);
