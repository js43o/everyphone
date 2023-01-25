import { atom } from 'recoil';
import { defaultSearchPhoneQuery, Phone, SearchPhoneQuery } from 'lib/types';

export const phonesState = atom<Phone[]>({
  key: 'phonesState',
  default: [],
});

export const searchPhoneQueryState = atom<SearchPhoneQuery>({
  key: 'searchPhoneQueryState',
  default: defaultSearchPhoneQuery,
});
