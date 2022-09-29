import {
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
} from './Comment.style';

const Comments = () => {
  return (
    <CommentBlock>
      <CommentHeader>댓글창</CommentHeader>
      <CommentInput />
      <CommentSection>
        <CommentTitle>제목</CommentTitle>
        <CommentAuthorBlock>
          <CommentAuthorImg />
          <CommentAuthor>
            <CommentId>작성자아이디</CommentId>
            <CommentTime>{Date.now()}</CommentTime>
          </CommentAuthor>
        </CommentAuthorBlock>
        <CommentContent>댓글 내용</CommentContent>
      </CommentSection>
    </CommentBlock>
  );
};

export default Comments;
