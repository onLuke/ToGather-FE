import { divide } from 'lodash';
import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const MessageContainerBlock = styled.div`
  position: relative;
  top: 5rem;
  padding: 0 4rem;
`;

const MessagContainereWrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
`;


const MessageRoomName = styled.div`
  margin-bottom: 3rem;
  font-size: 24px;
  font-weight: 600;
  color: ${COLOR.LOGO_COLOR};
`;

const MessageBoxBlock = styled.div`
  padding-top: 5rem;
  padding-left: 5rem;
  padding-right: 5rem;
`;

const MessageBoxWrapper = styled.div`
  height: 60vh;
  padding: 2rem;
  border: 1px solid ${COLOR.LOGO_COLOR};
  border-radius: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 20px; /*스크롤바의 너비*/
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(143, 227, 222, 0.35); /*스크롤바의 색상*/
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 10px;
    margin-right: 5px;
  }

  &::-webkit-scrollbar-track {
  }
`;

const MessageBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const BubbleMessage = styled.div`
  width: 25rem;
  padding: 1rem;
  border: 1px solid ${COLOR.BLUR_500};
  border-radius: 1rem;
  background-color: ${COLOR.BLUR_100};
  color: black;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  img {
    width: 50px;
    height: 50px;
    border: 1px solid;
    border-radius: 50%;
  }
`;

const UserNickname = styled.div`
  font-size: 12px;
  padding-left: 5px;
  margin-bottom: 5px;
  color: gray;
`;

const MessageTime = styled.span`
  font-size: 12px;
  padding-top: 30px;
  padding-left: 5px;
  color: gray;
`;

const ChatMessageWrapper = styled.div`
  margin-top: 1rem;
`;

const ChatMessageInput = styled.input`
  width: 90%;
  height: 3rem;
  padding: 1rem;
  border: 2px solid rgba(143, 227, 222, 0.7);
  border-radius: 1rem;
  margin-right: 1rem;
  &:focus {
    border: 4px solid rgba(143, 227, 222);
    outline: none;
  }
`;

const ChatSendButton = styled.button`
  width: 8%;
  height: 3rem;
  background-color: ${COLOR.BLUR_700};
  border-radius: 1rem;
  color: white;
  font-size: 20px;
  line-height: 1px;
`;

export {
  MessageContainerBlock,
  MessagContainereWrapper,
  MessageBoxBlock,
  UserProfile,
  UserNickname,
  MessageTime,
  BubbleMessage,
  ChatMessageInput,
  ChatSendButton,
  MessageBox,
  MessageRoomName,
  MessageBoxWrapper,
  ChatMessageWrapper,
};
