import React from 'react';
import StudyComponent from '../Study/StudyComponent';
import {
  Study,
  StudyAuthor,
  StudyDeadline,
  StudyFooter,
  StudyTitle,
  StudyViewer,
} from '../Study/StudyList.style';
import StudyTechs from '../Study/StudyTechs';
import {
  ChatRoomBlock,
  ChatRoomButton,
  MyProjectInner,
  MyProjectListBlock,
  Title,
  Wrapper,
} from './MyProjectList.stylese';

interface Props {
  [key: string]: any;
}
const MyProjectList = ({ myProject }: Props) => {
  return (
    <MyProjectListBlock>
      <Wrapper>
        {myProject.map((list: any, idx: number) => (
          <MyProjectInner key={idx}>
            <Title to="/">프로젝트 제목</Title>
            <ChatRoomBlock>
              <ChatRoomButton>채팅방 1 입장</ChatRoomButton>
              <ChatRoomButton>채팅방 3 입장</ChatRoomButton>
              <ChatRoomButton>채팅방 2 입장</ChatRoomButton>
              <ChatRoomButton>채팅방 4 입장</ChatRoomButton>
              <ChatRoomButton>채팅방 5 입장</ChatRoomButton>
            </ChatRoomBlock>
          </MyProjectInner>
        ))}
      </Wrapper>
    </MyProjectListBlock>
  );
};

export default MyProjectList;
