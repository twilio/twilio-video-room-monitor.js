import { chartDatum } from '../types';

export function connectNulls(data: chartDatum[]) {
  return data.map((d, i) => {
    const previousY = data[i - 1]?.y;
    if (d.y === null && data[i - 1]?.y !== null) {
      return { x: d.x, y: previousY };
    } else {
      return d;
    }
  });
}

export const truncateFront = (arr: any[], limit: number) =>
  arr.slice(Math.max(0, arr.length - limit), arr.length + limit);
