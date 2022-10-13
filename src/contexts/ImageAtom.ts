import { atom } from 'recoil';

export const imageAtom = atom<File>({
  key: 'IMAGE_VALUE',
  default: {} as File,
});
