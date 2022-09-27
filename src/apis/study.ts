import Api from './Api';
import { getRes } from '../contexts/getStudyAtom';
import { inputFormType } from '../pages/UploadStudy';

interface getRes {
  content: string;
  deadline: string;
  id: number;
  location: string;
  member?: {
    email: string;
    id: number;
    nickname: string;
    profileImage: string;
  };
  personnel: number;
  status: 'COMPLETED' | 'RECRUITING';
  techStacks: number[];
  title: string;
}

interface studyData {
  offline: boolean;
  personnel: string;
  status: string;
  deadline: string;
  techStackIds: number[];
  content: string;
  title: string;
  location: number[];
}
interface createRes {}

interface updateRes {}

export const getStudy = async (pageNumber: number, isRecruiting: string) => {
  const res = await Api.get<getRes>(
    `https://dokuny.blog/projects?limit=9&pageNumber=${pageNumber}`
    /*     `https://jsonplaceholder.typicode.com/todos/${pageNumber}` */
  );
  console.log('get Request');

  return res;
};
export const createStudy = (data: inputFormType) => {
  Api.post<createRes>(`https://dokuny.blog/projects`, data);
};

export const updateStudy = (data: studyData) => {
  Api.post<updateRes>('');
};

export const checkToken = () => {};

export const userLogout = () => {};
