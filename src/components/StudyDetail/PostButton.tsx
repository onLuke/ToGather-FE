import React from 'react';
import { CancelButton, SubmitButton } from 'src/styles/Button';
import { PostButtonBlock } from './PostButton.styles';

interface IProps {
  updatePost: () => void;
  removePost: () => void;
}

const PostButton = ({ updatePost, removePost }: IProps) => {
  return (
    <PostButtonBlock>
      <SubmitButton onClick={updatePost}>포스트 수정</SubmitButton>
      <CancelButton onClick={removePost}>포스트 삭제</CancelButton>
    </PostButtonBlock>
  );
};

export default PostButton;
