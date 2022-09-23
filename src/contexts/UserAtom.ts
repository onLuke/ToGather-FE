import { atom, selector } from 'recoil';

interface techStack {
  value?: number;
  id?: number;
  name?: string;
  label?: string;
}

interface data {
  id: string;
  techStackDtos: techStack[];
  profileImage: string;
  nickname: string;
}

export const userAtom = atom<data>({
  key: 'USER',
  default: { id: '', techStackDtos: [], nickname: '', profileImage: '' },
});

export const userSelector = selector<data>({
  key: 'USER_SELECTOR',
  get: ({ get }) => {
    const prevData = get(userAtom);
    const filteredStack = prevData.techStackDtos.reduce((acc: techStack[], cur: techStack) => {
      let temp = [...acc, { value: cur.id, label: cur.name }];
      return temp;
    }, []);

    return { ...prevData, techStackDtos: filteredStack };
  },
  set: ({ set }, newValue) => set(userAtom, newValue),
});
