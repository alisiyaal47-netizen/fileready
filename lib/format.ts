export function formatBytes(bytes: number): string {
  if (bytes < 1_000) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let index = -1;
  do {
    value /= 1_000;
    index += 1;
  } while (value >= 1_000 && index < units.length - 1);
  return `${value.toFixed(value < 10 ? 2 : 1)} ${units[index]}`;
}
