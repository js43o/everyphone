export function getArrayOfRange(start: number, end: number) {
  return Array.from({ length: end - start }, (_, index) => index + start);
}

export function getArrayOfSize(start: number, size: number) {
  return Array.from({ length: size }, (_, index) => index + start);
}
