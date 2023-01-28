import { DATA_UNIT, UNIT_OF_SPEC } from 'utils/constants';
import { Specs } from './types';
import { Phone } from 'utils/types';

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

export const getSpecsOfPhone = (phone: Phone) => {
  const specs: Specs = [
    { key: '제조사', value: [phone.manufacturer] },
    { key: '출시일자', value: [phone.released] },
    {
      key: '디스플레이',
      value: [
        `${phone.display.size} 인치`,
        `${phone.display.resolution.pixel} px`,
        `${phone.display.resolution.ratio} 비율`,
        `${phone.display.refreshRate} Hz`,
      ],
    },
    {
      key: '카메라',
      value: [
        phone.camera.rear,
        `${`후면 ${[
          phone.camera.main,
          phone.camera.second,
          phone.camera.third,
          phone.camera.fourth,
        ]
          .filter((x) => x)
          .join('/')} MP`}`,
        `${`전면 ${phone.camera.front} MP`}`,
      ],
    },
    {
      key: '하드웨어',
      value: [
        phone.hardware.processor,
        `${phone.hardware.ram.join('/')}GB RAM`,
      ],
    },
    {
      key: '저장용량',
      value: [`${phone.price.map((p) => p.variant).join('/')}`],
    },
    { key: '배터리', value: [`${phone.hardware.battery} mAh`] },
  ];

  return specs;
};
