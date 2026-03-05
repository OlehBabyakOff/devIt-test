export function randDelay(min: number, max: number) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

