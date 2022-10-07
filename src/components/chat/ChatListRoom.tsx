import Breadcrumb from '../breadCrumb/Breadcrumb';
import { ChatListRoomBlock } from './ChatListRoom.styles';
import MyProjectList from './MyProjectList';

const ChatListRoom = () => {
  return (
    <ChatListRoomBlock>
      <Breadcrumb>마이 페이지 - 채팅방</Breadcrumb>
      <MyProjectList />
    </ChatListRoomBlock>
  );
};

export default ChatListRoom;
