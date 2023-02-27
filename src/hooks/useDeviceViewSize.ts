import { Phone } from 'utils/types';

const useDeviceViewSize = (demension1: number[], demension2: number[]) => {
  const propotion = 70;
  const vwOffset = propotion / ((demension1[1] || 70) + (demension2[1] || 70));
  const pxOffset = 3;
};

export default useDeviceViewSize;
