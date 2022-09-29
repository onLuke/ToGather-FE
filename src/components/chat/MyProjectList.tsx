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
  Wrapper,
} from './MyProjectList.stylese';

interface Props {
  [key: string]: any;
}
const MyProjectList = ({ myProject }: Props) => {
  return (
    <MyProjectListBlock>
      <Wrapper>
        {myProject.map((list: any) => (
          <MyProjectInner key={list.id}>
            <div>
              <StudyComponent
                id={list.id}
                techs={list.techs}
                deadline={list.deadline}
                title={list.search.title}
                author={list.search.author}
              />
            </div>
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
