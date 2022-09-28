import React from 'react';
import { Link } from 'react-router-dom';
import { MyPageBlock } from './MyPageList.styles';
interface Props {
  myPageIsOpen: boolean;
}

const MyPageList = ({ myPageIsOpen }: Props) => {
  return (
    <MyPageBlock isOpen={myPageIsOpen}>
      <Link to="/mypage">내정보</Link>
      <Link to="/chat">채팅방</Link>
      <Link to="/myProject">프로젝트</Link>
    </MyPageBlock>
  );
};

export default MyPageList;
