import { ChangeEvent, useEffect, useState } from 'react';
import * as StompJs from '@stomp/stompjs';
import { useRecoilValue } from 'recoil';
import { Client } from '@stomp/stompjs';
import { authAtom } from '../contexts/AuthAtom';
import { getChatList } from 'src/apis/chat';
import { useNavigate } from 'react-router-dom';
import ChatContainer from 'src/components/chat/ChatContainer';
import { userAtom } from 'src/contexts/UserAtom';
import { currentTime } from 'src/lib/time';

interface IProps {
  roomId: string;
  projectId: string;
}

interface IMessage {
  nickname: string;
  profileImage: string;
  message: string;
  sendTime: string;
}

let client: Client | null = null;

const ChatPage = ({ roomId, projectId }: IProps) => {
  const auth = useRecoilValue(authAtom);
  const user = useRecoilValue(userAtom);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState<IMessage[]>([]);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const subscribe = () => {
    if (client != null) {
      client.subscribe(`/topic/room.${1}`, (data: any) => {
        const newMessage: IMessage = JSON.parse(data.body);
        setMessage((prevData) => [...prevData, { ...newMessage }]);
      });
    }
  };

  useEffect(() => {
    handleGetChatList();
  }, []);

  useEffect(() => {
    if (auth.accessToken) {
      connect();
    }
    return () => disConnect();
  }, [auth.accessToken]);

  const handleGetChatList = async () => {
    try {
      const response = await getChatList('1', '1');

      if (response.data?.errorMessage) {
        alert(response.data.errorMessage);
        navigate('/');
      }

      if (response.data.messages) {
        console.log('api 호출');
        setMessage(response.data.messages.reverse());
        setRoomName(response.data.roomName);
      }
    } catch (e) {
      console.log(e);
      alert('채팅 데이터를 가져오지 못했습니다.');
    }
  };

  const connect = () => {
    client = new StompJs.Client({
      brokerURL: 'wss://dokuny.blog/stomp/chat',
      connectHeaders: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      debug: function (str) {
        // console.log(str);
      },
      onConnect: () => {
        console.log('connect');
        subscribe();
      },
      onStompError: function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.activate();
  };

  const disConnect = () => {
    if (client != null) {
      console.log('disConnect');
      if (client.connected) client.deactivate();
    }
  };

  const handleSendMessage = () => {
    if (client != null) {
      if (!client.connected) return;
      const time = currentTime();
      console.log(time);
      client.publish({
        destination: `/app/chat.${1}.message`,
        body: JSON.stringify({
          message: content,
          nickname: user.nickname,
          profileImage: user.profileImage,
          sendTime: time,
        }),
      });
      setContent('');
    }
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <ChatContainer
      roomName={roomName}
      message={message}
      content={content}
      sendMessage={handleSendMessage}
      inputChange={inputChange}
      keyPress={inputKeyPress}
    />
  );
};

export default ChatPage;
