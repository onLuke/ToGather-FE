import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from '../../styles/Flex';

const CommentBlock = styled.section`
  width: 80%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 0 10rem;
  margin-bottom: 10rem;
`;

const CommentHeader = styled.h1`
  margin: 0 0 30px;
  font-size: 22px;
`;

const CommentInput = styled.textarea`
  font-family: inherit;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 2px solid #e1e1e1;
  border-radius: 16px;
  width: 95%;
  min-height: 100px;
  margin-bottom: 10px;
  resize: none;
`;

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 100px;
`;

const CommentTitle = styled.h1`
  margin: 0 0 30px;
  font-size: 22px;
`;

const CommentAuthorBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;
const CommentAuthorImg = styled.img`
  cursor: pointer;
  display: block;
  height: 3rem;
  width: 3rem;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentAuthor = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentId = styled.div`
  color: #333;
  font-weight: 700;
`;

const CommentTime = styled.div`
  font-size: 14px;
  line-height: 126.5%;
  letter-spacing: -0.005em;
  color: #9f9f9f;
`;

const CommentContent = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: break-all;
  overflow-wrap: break-word;
`;

const CommentButtonBlock = styled.div`
  margin-top: 1rem;
`;

const ChageCommnetInput = styled.input`
  padding: 0.5rem 1rem;
  border: 0.5px solid;
  border-radius: 1rem;
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: break-all;
  overflow-wrap: break-word;
`;

export {
  CommentBlock,
  CommentHeader,
  CommentInput,
  CommentSection,
  CommentTitle,
  CommentAuthorBlock,
  CommentAuthorImg,
  CommentAuthor,
  CommentId,
  CommentTime,
  CommentContent,
  CommentButtonBlock,
  ChageCommnetInput,
};
