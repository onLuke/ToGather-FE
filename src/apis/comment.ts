import Api from './Api';

export const addComments = (id: string, content: string) =>
  Api.post(`/projects/${id}/comments`, content);

export const updateComments = (id: string, content: string) =>
  Api.patch(`/comments/${id}`, content);

export const removeComments = (id: string) => Api.delete(`/comments/${id}`);
