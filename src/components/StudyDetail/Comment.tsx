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

interface IProps {
  gettedData: any;
}
const Comments = ({ gettedData }: IProps) => {
  return (
    <CommentBlock>
      <CommentHeader>댓글창</CommentHeader>
      <div style={{ display: 'flex' }}>
        <CommentInput />
        <button
          style={{
            width: '10%',
            marginLeft: '1rem',
            borderRadius: '1rem',
            background: 'aliceblue',
          }}
        >
          입력
        </button>
      </div>
      {gettedData.comments.map((item: any) => (
        <CommentSection>
          <CommentAuthorBlock>
            <CommentAuthorImg src={item.member.profileImage} alt="프로필" />
            <CommentAuthor>
              <CommentId>{item.member.nickname}</CommentId>
              <CommentTime>{item.createdAt}</CommentTime>
            </CommentAuthor>
          </CommentAuthorBlock>
          <CommentContent>{item.content}</CommentContent>
        </CommentSection>
      ))}
    </CommentBlock>
  );
};

export default Comments;
