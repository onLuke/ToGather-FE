import Api from './Api';

export const getChatList = async (projectId: string, chatId: string) => {
  return await Api.get(`/projects/${projectId}/chats/${chatId}`);
};
