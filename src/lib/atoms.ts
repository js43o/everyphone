import { atom } from 'recoil';
import { Phone } from 'lib/types';

export const phonesState = atom<Phone[]>({
  key: 'phonesState',
  default: [],
});
