import { atom } from 'recoil';

const isUploaded = atom({
  key: 'IS_UPLOADED',
  default: false,
});

const pageNumber = atom({
  key: 'PAGE_NUMBER',
  default: 0,
});

const isRecruiting = atom<'RECRUITING' | 'COMPLETE'>({
  key: 'IS_RECRUITING',
  default: 'RECRUITING',
});

export { isUploaded, pageNumber, isRecruiting };
