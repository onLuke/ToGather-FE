import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { getUser } from 'src/apis/user';
import { IuserType } from 'src/components/type/userType';

interface techStack {
  value?: number;
  id?: number;
  name?: string;
  label?: string;
}

const { persistAtom } = recoilPersist();

export const userAtom = atom<IuserType>({
  key: 'USER',
  default: { id: '', techStackDtos: [], nickname: '', profileImage: '' },
  effects_UNSTABLE: [persistAtom],
});

export const userSelector = selector<IuserType>({
  key: 'USER_SELECTOR',
  get: ({ get }) => {
    const prevData = get(userAtom);
    const filteredStack = prevData.techStackDtos.reduce((acc: any, cur: any) => {
      let temp = [...acc, { value: cur.id, label: cur.name }];
      return temp;
    }, []);

    return { ...prevData, techStackDtos: filteredStack };
  },
  set: ({ set }, newValue) => set(userAtom, newValue),
});

export const userLoginSelector = selector({
  key: 'USER_LOGIN_SELECTOR',
  get: async ({ get }) => {
    const userInfo = get(userAtom);
    const response = await getUser(userInfo.id);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
  },
});
