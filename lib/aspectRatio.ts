export function greatestCommonDivisor(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function aspectRatioLabel(width: number, height: number): string {
  if (!width || !height) return "Unavailable";
  const divisor = greatestCommonDivisor(width, height);
  const exact = `${width / divisor}:${height / divisor}`;
  return exact.length <= 9 ? exact : `${(width / height).toFixed(2)}:1`;
}
