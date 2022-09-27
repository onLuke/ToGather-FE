import { atom } from 'recoil';
interface props {
  La: number;
  Ma: number;
  regionName: string;
}

export const UserLocationAtom = atom<props>({
  key: 'USER_LOCATION',
  default: {
    La: 0,
    Ma: 0,
    regionName: '',
  },
});
