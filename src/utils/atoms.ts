import { atom } from 'recoil';
import { v1 } from 'uuid';
import {
  defaultFilterPhoneQuery,
  Phone,
  FilterPhoneQuery,
  SearchingMode,
} from 'utils/types';

export const phonesState = atom<Phone[]>({
  key: `phonesState/${v1()}`,
  default: [],
});

export const filterPhoneQueryState = atom<FilterPhoneQuery>({
  key: `filterPhoneQueryState/${v1()}`,
  default: defaultFilterPhoneQuery,
});

export const specHighlightState = atom<boolean>({
  key: `specHighlightState/${v1()}`,
  default: true,
});

export const searchingModeState = atom<SearchingMode>({
  key: `searchingModeState/${v1()}`,
  default: {
    opened: false,
    mode: 'phones',
  },
});

export const comparisonDevicesState = atom<[Phone?, Phone?]>({
  key: `comparisonDevices/${v1()}`,
  default: [undefined, undefined],
});

export const handSizeState = atom<number>({
  key: `handSize/${v1()}`,
  default: 170,
});
