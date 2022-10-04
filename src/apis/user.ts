import Api from './Api';

export const getUser = (id: string) => Api.get(`/members/${id}`);

export const editUser = (id: string, form: any) => Api.put(`/members/${id}`, form);

export const withdrawal = (id: string) => Api.post(`/members/${id}/withdrawal`);

export const checkNickname = (nickname: string) =>
  Api.get(`/members/nickname/exist`, { params: { nickname } });
