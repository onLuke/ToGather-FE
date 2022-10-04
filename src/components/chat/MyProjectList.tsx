import _, { divide } from 'lodash';
import React, { useEffect, useState } from 'react';
import { createChatRoomByProjectId, getChatRoomByProjectId } from 'src/apis/chatRoom';
import { getParticipatingProjects } from 'src/apis/project';
import { CancelButton, CustomButton } from 'src/styles/Button';
import {
  ChatHandleBlock,
  ChatRoomBlock,
  ChatRoomButton,
  ChatRoomWrapper,
  MyProjectInner,
  MyProjectListBlock,
  Title,
  Wrapper,
  AccordionButton,
} from './MyProjectList.stylese';

interface Props {
  [key: string]: any;
}
const MyProjectList = ({ myProject }: Props) => {
  const [project, setProject] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [confirmProjectId, setConfirmProjectId] = useState('');

  useEffect(() => {
    ParticipatingProjectsList();
  }, []);

  const ParticipatingProjectsList = async () => {
    try {
      const response = await getParticipatingProjects();
      setProject(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getChatingRoomList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const projectId = e.currentTarget.id;
    try {
      const response = await getChatRoomByProjectId(projectId);

      setChatRoomList(response.data.chatRoomDtos);
      setConfirmProjectId(response.data.projectId);
    } catch (e) {
      console.error(e);
    }
  };

  const createChatRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectId = e.currentTarget.dataset.projectid!;
    const chatRoomName = prompt('채팅방을 입력하세요.');

    if (!chatRoomName) {
      alert('공백은 안됩니다.');
      return;
    }

    try {
      const response = await createChatRoomByProjectId(projectId, chatRoomName);

      if (response.data.status === 400) {
        throw new Error(response.data.errorMessage);
      }

      alert('채팅방 생성');
    } catch (e) {
      console.error(e);
    }
  };

  const removeChatRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const updateChatRoomName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <MyProjectListBlock>
      <Wrapper>
        {project.length === 0 ? <div>현재 참여중인 프로젝트가 없습니다.</div> : <></>}
        {project.map((item: any) => (
          <MyProjectInner key={'project' + item.projectId}>
            <div>
              <Title to="/">{item.title}</Title>
              <CustomButton data-projectid={item.projectId} onClick={createChatRoom}>
                방생성
              </CustomButton>
            </div>
            <div>
              <span>채팅방 목록</span>
              <AccordionButton id={item.projectId} onClick={getChatingRoomList}>
                ▼
              </AccordionButton>
              {confirmProjectId === item.projectId ? (
                chatRoomList.map((room: any) => (
                  <ChatRoomBlock key={'room' + room.id}>
                    <ChatRoomWrapper>
                      <ChatRoomButton to="/chat">채팅방 입장</ChatRoomButton>
                      <ChatHandleBlock>
                        <CustomButton
                          data-projectid={item.projectId}
                          data-roomid={room.roomId}
                          onClick={updateChatRoomName}
                        >
                          수정
                        </CustomButton>
                        <CancelButton
                          data-projectid={item.projectId}
                          data-roomid={room.roomId}
                          onClick={removeChatRoom}
                        >
                          삭제
                        </CancelButton>
                      </ChatHandleBlock>
                    </ChatRoomWrapper>
                  </ChatRoomBlock>
                ))
              ) : (
                <></>
              )}
            </div>
          </MyProjectInner>
        ))}
      </Wrapper>
    </MyProjectListBlock>
  );
};

export default MyProjectList;
