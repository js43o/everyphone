import { SortOrder } from 'mongoose';

export const DATA_UNIT = ['B', 'KB', 'MB', 'GB', 'TB'];
export const MANUFACTURER = ['Samsung', 'Apple', 'Google'];
export const UNIT_OF_SPEC = new Map([
  ['height', 'mm'],
  ['battery', 'mAh'],
  ['weight', 'g'],
]);
export const ITEM_PER_PAGE = 6;
export const SORT_BY_QUERY = new Map<string, { [key: string]: SortOrder }>([
  ['latest', { released: -1 }],
  ['old', { released: 1 }],
  ['high-price', { 'price.0.value': -1 }],
  ['low-price', { 'price.0.value': 1 }],
]);
export const CAMERA_TYPE = [
  '싱글 카메라',
  '듀얼 카메라',
  '트리플 카메라',
  '쿼드 카메라',
  '펜타 카메라',
];
