import Api from './Api';

export const createChatRoomByProjectId = (projectId: string, roomName: string) =>
  Api.post(`/projects/${projectId}/chats`, { roomName: roomName });

export const getChatRoomByProjectId = (projectId: string) =>
  Api.get(`/projects/${projectId}/chats`);
