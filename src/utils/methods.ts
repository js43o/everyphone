import { DATA_UNIT, CAMERA_TYPE, UNIT_OF_SPEC } from 'utils/constants';
import { Specs } from './types';
import { Phone } from 'utils/types';

export const isNumber = (str: string) => {
  return /^\d*$/.test(str);
};

export const trimToRange = (
  value: number,
  minValue?: number,
  maxValue?: number
) => {
  return Math.min(Math.max(value, minValue || value), maxValue || value);
};

export const getArrayOfRange = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, index) => index + start);
};

export const getArrayOfSize = (start: number, size: number) => {
  return Array.from({ length: size }, (_, index) => index + start);
};

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

export const getRearCameraString = (camera?: Phone['camera']) => {
  if (!camera) return '';

  return Object.entries(camera)
    .filter(([key, value]) => key !== 'rear' && key !== 'front')
    .map(([key, value]) => `${value} MP`)
    .join('+');
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

export const getSuperiorNumber = (
  title: string,
  content1?: string | number,
  content2?: string | number
) => {
  if (!content1 || !content2) return 0;

  if (
    [
      '출시일자',
      '화면 크기',
      '해상도',
      '최대 주사율',
      'RAM',
      '저장용량',
      '배터리',
      '카메라',
      '크기',
    ].includes(title)
  ) {
    if (content1 > content2) return 1;
    if (content1 < content2) return 2;
  }
  if (['가격', '무게'].includes(title)) {
    if (content1 < content2) return 1;
    if (content1 > content2) return 2;
  }
  if (
    title === '카메라 종류' &&
    typeof content1 === 'string' &&
    typeof content2 === 'string'
  ) {
    if (CAMERA_TYPE.indexOf(content1) > CAMERA_TYPE.indexOf(content2)) return 1;
    if (CAMERA_TYPE.indexOf(content1) < CAMERA_TYPE.indexOf(content2)) return 2;
  }

  return 0;
};

export const getSuperiorNumberOfCamera = (
  content1?: Phone['camera'],
  content2?: Phone['camera']
) => {
  if (!content1 || !content2) return 0;

  const filtered1 = Object.entries(content1)
    .filter(([key, value]) => key !== 'rear' && key !== 'front')
    .map(([key, value]) => Number(value));
  const filtered2 = Object.entries(content2)
    .filter(([key, value]) => key !== 'rear' && key !== 'front')
    .map(([key, value]) => Number(value));

  if (Math.max(...filtered1) > Math.max(...filtered2)) return 1;
  if (Math.max(...filtered1) < Math.max(...filtered2)) return 2;

  const sum1 = filtered1.reduce((acc, cur) => acc + cur);
  const sum2 = filtered2.reduce((acc, cur) => acc + cur);

  if (sum1 > sum2) return 1;
  if (sum1 < sum2) return 2;

  return 0;
};

export const getFavoriteList = (): string[] => {
  const json = localStorage.getItem('favorite');
  return json ? JSON.parse(json) : [];
};

export const toggleFavorite = (name: string) => {
  let favorite = getFavoriteList();
  if (isFavorite(name)) favorite = favorite.filter((item) => item !== name);
  else favorite.push(name);
  localStorage.setItem('favorite', JSON.stringify(favorite));
};

export const isFavorite = (name: string) => {
  const favorite = getFavoriteList();
  return favorite.includes(name);
};

export const getColorByTimeStr = (str: string) => {
  const PALETTE = [
    '#34568B',
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#955251',
    '#B565A7',
    '#DD4124',
    '#D65076',
    '#45B8AC',
    '#EFC050',
    '#5B5EA6',
  ];
  const hashedIndex =
    str
      .split(':')
      .map((pair) => pair.split(''))
      .flat()
      .reduce((acc, cur) => acc + Number(cur), 0) % PALETTE.length;

  return PALETTE[hashedIndex];
};
