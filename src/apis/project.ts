import Api from './Api';

export const getProjectById = (id: string) => Api.get(`/projects/${id}`);

export const getOwnProjectByToken = () => Api.get(`/projects/myProjects`);

export const getOwnProjectToUserList = (id: string) => Api.get(`/projects/${id}/applicants`);

export const putUserMyProjectEnter = (projectId: string, userId: string) =>
  Api.put(`/projects/${projectId}/applicants/${userId}/accept`);

export const putUserMyProjectReject = (projectId: string | undefined, userId: string) =>
  Api.put(`/projects/${projectId}/applicants/${userId}/reject`);

export const enterProjectById = (id: string) => Api.post(`/projects/${id}/applicants`);

export const getParticipatingProjects = () => Api.get(`/projects/participatingProjects`);

export const getProjectAllByPage = (
  limit: number,
  pageParam: number,
  status: string,
  techs: string,
  title: string
) => Api.get(`/projects?limit=${limit}&pageNumber=${pageParam}&status=${status}${techs}${title}`);
