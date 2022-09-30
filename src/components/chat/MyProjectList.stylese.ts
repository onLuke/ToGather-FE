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
`;

const ChatRoomBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ChatRoomButton = styled.button`
  width: 100%;
  height: 12%;
  background: white;
  border: 3px solid ${COLOR.GRAY_100};
  border-radius: 1.5rem;
  font-size: 20px;
  & + & {
    margin-top: 1rem;
  }
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

  &:hover {
    opacity: 0.6;
  }
`;
export { MyProjectListBlock, Wrapper, MyProjectInner, ChatRoomBlock, ChatRoomButton, Title };
