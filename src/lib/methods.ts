import { DATA_UNIT, UNIT_OF_SPEC } from 'lib/constants';

export function getArrayOfRange(start: number, end: number) {
  return Array.from({ length: end - start }, (_, index) => index + start);
}

export function getArrayOfSize(start: number, size: number) {
  return Array.from({ length: size }, (_, index) => index + start);
}

export const convertToDataFormat = (x: number) => {
  let unitIndex = 0;

  while (x >= 1024) {
    x = Math.floor(x / 1024);
    unitIndex++;
  }
  const overflowed = unitIndex >= DATA_UNIT.length;

  if (overflowed) return `1024${DATA_UNIT[DATA_UNIT.length - 1]}+`;

  return `${x}${DATA_UNIT[Math.min(unitIndex, DATA_UNIT.length - 1)]}`;
};

export const convertToRangeFormat = (field: string, values: number[]) => {
  if (field === 'storage') {
    return values.map((value) => convertToDataFormat(2 ** value)).join(' - ');
  }
  return values
    .map((value) => `${value}${UNIT_OF_SPEC.get(field)}`)
    .join(' - ');
};
