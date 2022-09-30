import Api from './Api';
import { getRes } from '../contexts/getStudyAtom';
import { inputFormType } from '../pages/UploadStudy';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isUploaded, pageNumber, isRecruiting } from '../contexts/chachingOptionAtom';
import { TechFilterSelector, TitleFilterAtom } from 'src/contexts/FilterOptionAtom';

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

export const getStudy = async (
  pageNumber: number,
  isRecruiting: string,
  techIds: string[] | null,
  title: string | null
) => {
  const res = await Api.get(
    `https://dokuny.blog/projects?limit=9&pageNumber=${pageNumber}&status=${isRecruiting}${
      techIds !== null ? '&techStacks=' + techIds.join(',') : ''
    }${title !== null ? '&title=' + title : ''}`
    /*     `https://jsonplaceholder.typicode.com/todos/${pageNumber}` */
  );
  const { data } = res;
  return data;
};
export const createStudy = async (data: inputFormType) => {
  Api.post<createRes>(`https://dokuny.blog/projects`, data);
};

export const updateStudy = (data: studyData) => {
  Api.post<updateRes>('');
};

export const getDetail = async (id: string) => {
  const res = await Api.get(`https://dokuny.blog/projects/${id}`);
  const { data } = res;
  return data;
};

export const userLogout = () => {};
