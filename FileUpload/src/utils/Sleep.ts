export function sleep(waitMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, waitMs);
  });
}
