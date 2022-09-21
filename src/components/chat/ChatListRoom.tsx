import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { filteredStudy } from 'src/contexts/SeacrchTechsAtom';
import { userAtom } from 'src/contexts/UserAtom';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { ChatListRoomBlock } from './ChatListRoom.styles';
import MyProjectList from './MyProjectList';

const ChatListRoom = () => {
  const myProject = useRecoilValue(filteredStudy);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const myProjectMock = myProject.filter((_, idx) => idx < 2);
  useEffect(() => {
    if (!user.id) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  });
  return (
    <ChatListRoomBlock>
      <Breadcrumb>마이 페이지 - 채팅방</Breadcrumb>
      <MyProjectList myProject={myProjectMock} />
    </ChatListRoomBlock>
  );
};

export default ChatListRoom;
