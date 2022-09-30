import { atom, selector } from 'recoil';
interface Data {
  [key: number]: boolean;
}

export const TechFilterAtom = atom<Data>({
  key: 'TECH_FILTER',
  default: {},
});

export const TechFilterSelector = selector({
  key: 'TECH_FILTER_SELECTOR',
  get: ({ get }) => {
    const keys = Object.keys(get(TechFilterAtom));

    return keys.length === 0 ? null : keys;
  },
});

export const StatusFilterAtom = atom<'RECRUITING' | 'COMPLETED'>({
  key: 'STATUS_OPTION',
  default: 'RECRUITING',
});

export const TitleFilterAtom = atom<null | string>({
  key: 'TITLE_OPTION',
  default: null,
});
