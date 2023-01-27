import { atom } from 'recoil';
import { defaultSearchPhoneQuery, Phone, SearchPhoneQuery } from 'lib/types';
import { v1 } from 'uuid';

export const phonesState = atom<Phone[]>({
  key: `phonesState/${v1()}`,
  default: [],
});

export const searchPhoneQueryState = atom<SearchPhoneQuery>({
  key: `searchPhoneQueryState/${v1()}`,
  default: defaultSearchPhoneQuery,
});
