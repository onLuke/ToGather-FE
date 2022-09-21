import React from 'react';
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
              <Study to="/">
                <StudyTechs techsList={list.techs} />
                <StudyDeadline>
                  마감 예정일
                  <span aria-hidden="true">|</span>
                  {list.deadline}
                </StudyDeadline>
                <StudyTitle>{list.search.title}</StudyTitle>
                <StudyFooter>
                  <StudyAuthor>
                    <img src="/" width="36px" height="36px" />
                    {list.search.author}
                  </StudyAuthor>
                  <StudyViewer>viewerArea</StudyViewer>
                </StudyFooter>
              </Study>
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
