import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from '../../styles/Flex';

const Title = styled.h1`
  font-size: 40px;
`;

const AuthorBlock = styled.div`
  ${Flex({ alignItems: 'center' })}
  margin: 2rem 0 2rem;
  border-bottom: 3px solid #f2f2f2;
`;

const WrapAuthor = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10%;
  margin-bottom: 3rem;
`;

const AuthorImg = styled.img`
  cursor: pointer;
  display: block;
  height: 4rem;
  width: 4rem;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
`;

const Author = styled.div`
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding-right: 15px;
  border-right: 2px solid #e1e1e1;
`;

const DateBox = styled.div`
  font-size: 18px;
  color: #717171;
  margin-left: 10px;
`;

export { Title, AuthorBlock, WrapAuthor, AuthorImg, Author, DateBox };
