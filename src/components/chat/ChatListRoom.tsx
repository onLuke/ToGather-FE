import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'src/contexts/UserAtom';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { ChatListRoomBlock } from './ChatListRoom.styles';
import MyProjectList from './MyProjectList';

const ChatListRoom = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  return (
    <ChatListRoomBlock>
      <Breadcrumb>마이 페이지 - 채팅방</Breadcrumb>
      <MyProjectList myProject={[1, 2]} />
    </ChatListRoomBlock>
  );
};

export default ChatListRoom;
