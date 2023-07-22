export function randomIntFromInterval(min: number, max: number) {
  const flip = Math.random() > 0.5 ? -1 : 1;
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min) * flip;
}
