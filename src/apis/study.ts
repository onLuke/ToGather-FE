import Api from './Api';
import { getRes } from '../contexts/getStudyAtom';

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
  title: string;
  content: string;
  status: 'RECRUITING';
  offline: boolean;
  location: string;
  deadline: string;
  techStackIds: number[];
}

interface createRes {}

interface updateRes {}

export const getStudy = async (pageNumber: number, isRecruiting: string) => {
  const res = await Api.get<getRes>(
    `https://dokuny.blog/projects?limit=9&pageNumber=${pageNumber}&status=${isRecruiting}`
  );
  console.log(res);

  return res;
};
export const createStudy = (data: studyData) => Api.post<createRes>(`/projects`, data);

export const updateStudy = (data: studyData) => {
  Api.post<updateRes>('');
};

export const checkToken = () => {};

export const userLogout = () => {};
