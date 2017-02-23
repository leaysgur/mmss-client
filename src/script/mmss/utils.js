// @flow

export function toOrderNumber(str: string): number {
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : num;
}
