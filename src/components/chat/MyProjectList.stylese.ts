import { divide } from 'lodash';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import COLOR from 'src/constants/colors';

const MyProjectListBlock = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;

const MyProjectInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  & + & {
    padding-top: 1rem;
    border-top: 1px solid;
  }

  &:last-child {
    margin-bottom: 10rem;
  }
`;

const ChatRoomBlock = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  justify-content: center;
  flex-direction: column;
`;
const ChatRoomWrapper = styled.div`
  display: flex;

  & + & {
    margin-top: 1rem;
  }
`;

const ChatHeaderBlock = styled.div`
  display: flex;
  align-items: center;
`;

const ChatHandleBlock = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 3.5rem;
`;

const ChatRoomButton = styled(Link)`
  display: inline-block;
  width: 20%;
  height: 100px;
  background: white;
  border: 3px solid ${COLOR.GRAY_100};
  border-radius: 1.5rem;
  text-align: center;
  line-height: 4.5;
  font-size: 20px;
  &:hover {
    outline: none;
    border-color: ${COLOR.BLUR_700};
    box-shadow: 0 0 5px ${COLOR.BLUR_700};
  }
  &:last-child {
    & ::after {
      display: content;
      padding: 30px;
      margin-bottom: 2rem;
    }
  }
`;

const Title = styled(Link)`
  font-size: 30px;
  margin-bottom: 1rem;
  margin-right: 2rem;

  &:hover {
    opacity: 0.6;
  }
`;

const ChatRommInformation = styled.span`
  margin-left: 10px;
  padding-top: 10px;
  font-size: 12px;
  color: gray;
`;

const AccordionButton = styled.button`
  background: none;
  margin-left: 0.5rem;
`;
export {
  MyProjectListBlock,
  Wrapper,
  MyProjectInner,
  ChatRoomBlock,
  ChatRoomButton,
  ChatHandleBlock,
  Title,
  ChatRoomWrapper,
  AccordionButton,
  ChatHeaderBlock,
  ChatRommInformation,
};
