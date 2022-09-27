import { atom } from 'recoil';

export const UploadAtom = atom({
  key: 'UPLOAD_IS_NULL',
  default: {
    region: false,
    member: false,
  },
});
