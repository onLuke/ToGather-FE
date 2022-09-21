import { atom } from 'recoil';

interface data {
  id: string;
}

export const userAtom = atom<data>({
  key: 'USER',
  default: { id: '' },
});
