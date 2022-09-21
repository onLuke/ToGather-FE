import Api from './Api';

export const getUser = (id: string) => Api.get(`/members/${id}`);

export const withdrawal = (id: string) => Api.post(`/members/${id}/withdrawal`);
