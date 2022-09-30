import { atom, selector } from 'recoil';

export const NeedValueAtom = atom({
  key: 'NEED_VALUE',
  default: {
    Location: false,
    personnel: false,
    techStackIds: false,
    deadline: false,
    title: false,
    content: false,
  },
});

export const NeedSelector = selector({
  key: 'SELECT_NULL',
  get: ({ get }) => {
    const status = Object.entries(get(NeedValueAtom));
    for (let el of status) {
      if (el[1]) {
        return el[0];
      }
    }
  },
});
