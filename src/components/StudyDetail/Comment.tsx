import { Dispatch, SetStateAction } from 'react';
import { CancelButton, CustomButton, SubmitButton } from 'src/styles/Button';
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
  CommentButtonBlock,
  ChageCommnetInput,
} from './Comment.style';

interface IProps {
  userId: string;
  gettedData: any;
  commentValue: string;
  changeCommentValue: string;
  modCommnetValue: { id: string; mod: boolean };
  setComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addComment: (e: React.MouseEvent<HTMLElement>) => void;
  modComment: (e: React.MouseEvent<HTMLElement>, content: string) => void;
  chageComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitComment: (e: React.MouseEvent<HTMLElement>, content: string) => void;
  removeComment: (e: React.MouseEvent<HTMLElement>, content: string) => void;
}
const Comments = ({
  userId,
  gettedData,
  commentValue,
  modCommnetValue,
  changeCommentValue,
  setComment,
  addComment,
  modComment,
  chageComment,
  submitComment,
  removeComment,
}: IProps) => {
  return (
    <CommentBlock>
      <CommentHeader>댓글창</CommentHeader>
      <div style={{ display: 'flex' }}>
        <CommentInput value={commentValue} onChange={setComment} />
        <button
          style={{
            width: '10%',
            marginLeft: '1rem',
            borderRadius: '1rem',
            background: 'aliceblue',
          }}
          onClick={addComment}
        >
          입력
        </button>
      </div>
      {gettedData.comments.map((item: any) => (
        <CommentSection key={item.id}>
          <CommentAuthorBlock>
            <CommentAuthorImg src={item.member.profileImage} alt="프로필" />
            <CommentAuthor>
              <CommentId>{item.member.nickname}</CommentId>
              <CommentTime>{item.createdAt}</CommentTime>
            </CommentAuthor>
          </CommentAuthorBlock>
          {modCommnetValue.id == item.id ? (
            <>
              <ChageCommnetInput
                type="text"
                data-commentid={item.id}
                value={changeCommentValue}
                onChange={chageComment}
              />
            </>
          ) : (
            <CommentContent>{item.content.replace(/^"(.*)"$/, '$1')}</CommentContent>
          )}
          {userId == item.member.id ? (
            <CommentButtonBlock>
              {modCommnetValue.id == item.id ? (
                <CustomButton
                  color={'lightGreen'}
                  data-commentid={item.id}
                  onClick={(e: React.MouseEvent<HTMLElement>) => submitComment(e, item.content)}
                >
                  확인
                </CustomButton>
              ) : (
                <SubmitButton
                  data-commentid={item.id}
                  onClick={(e: React.MouseEvent<HTMLElement>) => modComment(e, item.content)}
                >
                  수정
                </SubmitButton>
              )}
              <CancelButton data-commentid={item.id} onClick={removeComment}>
                삭제
              </CancelButton>
            </CommentButtonBlock>
          ) : (
            <></>
          )}
        </CommentSection>
      ))}
    </CommentBlock>
  );
};

export default Comments;
