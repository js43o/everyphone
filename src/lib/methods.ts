import { DATA_UNIT, UNIT_OF_SPEC } from 'lib/constants';

export function getArrayOfRange(start: number, end: number) {
  return Array.from({ length: end - start }, (_, index) => index + start);
}

export function getArrayOfSize(start: number, size: number) {
  return Array.from({ length: size }, (_, index) => index + start);
}

export const convertToDataFormat = (byte: number) => {
  let unitIndex = Math.floor(Math.log(byte) / Math.log(1024));
  const overflowed = unitIndex >= DATA_UNIT.length;

  if (overflowed) return `1024${DATA_UNIT[DATA_UNIT.length - 1]}+`;

  return `${Math.floor(byte / Math.pow(1024, unitIndex))}${
    DATA_UNIT[Math.min(unitIndex, DATA_UNIT.length - 1)]
  }`;
};

export const convertToRangeFormat = (field: string, values: number[]) => {
  if (field === 'storage') {
    return values.map((value) => convertToDataFormat(2 ** value)).join(' - ');
  }
  return values
    .map((value) => `${value}${UNIT_OF_SPEC.get(field)}`)
    .join(' - ');
};
