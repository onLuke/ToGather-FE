import Api from './Api';
import { uploadType } from '../pages/UploadStudy';

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
  title: string | null,
  content: string | null,
  author: string | null
) => {
  const res = await Api.get(
    `/projects?limit=9&pageNumber=${pageNumber}&projectStatus=${isRecruiting}${
      techIds !== null ? '&techStacks=' + techIds.join(',') : ''
    }${title !== null ? '&title=' + title : ''}
    ${content !== null ? '&content=' + content : ''}
    ${author !== null ? '&author=' + author : ''}`
  );
  const { data } = res;
  return data;
};
export const createStudy = async (data: uploadType) => {
  Api.post<createRes>(`/projects`, data);
};

export const updateStudy = async (data: studyData, id: string) => {
  const res = await Api.put(`/projects/${id}`, data);
  return res;
};
export const removeStudy = (id: string) => {
  Api.delete<updateRes>(`/projects/${id}`);
};

export const getDetail = async (id: string) => {
  const res = await Api.get(`/projects/${id}`);
  const { data } = res;
  return data;
};

export const userLogout = () => {};
