import { atom } from 'recoil';
import { defaultFilterPhoneQuery, Phone, FilterPhoneQuery } from 'utils/types';
import { v1 } from 'uuid';

export const phonesState = atom<Phone[]>({
  key: `phonesState/${v1()}`,
  default: [],
});

export const filterPhoneQueryState = atom<FilterPhoneQuery>({
  key: `filterPhoneQueryState/${v1()}`,
  default: defaultFilterPhoneQuery,
});
