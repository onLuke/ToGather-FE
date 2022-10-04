import { atom, selector } from 'recoil';
interface Data {
  [key: number]: boolean;
}
interface stringData {
  [key: string]: string | null;
}

interface numberData {
  [key: string]: number | null;
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

export const TextFilterAtom = atom<stringData>({
  key: 'TEXT_FILTER',
  default: {
    title: null,
    content: null,
    author: null,
  },
});

export const LocationFilterAtom = atom<numberData>({
  key: 'LOCATION_FILTER',
  default: {
    latitude: null,
    longitude: null,
  },
});
