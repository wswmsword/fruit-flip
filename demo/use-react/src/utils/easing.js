const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
  custom: n => ((n /= 0.5) < 1 ? 0.5 * Math.pow(n, 3) : 0.5 * (Math.pow(n - 2, 3) + 2)),
};
export default easing;