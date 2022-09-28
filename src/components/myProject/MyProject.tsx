import React from 'react';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { MyProjectBlock, Wrapper } from './MyProject.styles';

const MyProject = () => {
  return (
    <MyProjectBlock>
      <Breadcrumb>내정보 - 내 작성글</Breadcrumb>
      <Wrapper>
        <div>등록된 공고가 없습니다.</div>
      </Wrapper>
    </MyProjectBlock>
  );
};

export default MyProject;
