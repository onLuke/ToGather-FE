import React from 'react';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { MyProjectInner, Title } from '../chat/MyProjectList.stylese';
import { MyProjectBlock, Wrapper } from './MyProject.styles';
import UserIntoProject from './UserIntoProject';

const MyProject = () => {
  return (
    <MyProjectBlock>
      <Breadcrumb>마이 페이지 - 내 작성글</Breadcrumb>
      <Wrapper>
        {/* <div>등록된 공고가 없습니다.</div> */}
        {[1, 2].map((list: any, idx: number) => (
          <MyProjectInner key={idx}>
            <Title to="/">프로젝트 제목</Title>
            <UserIntoProject />
          </MyProjectInner>
        ))}
      </Wrapper>
    </MyProjectBlock>
  );
};

export default MyProject;
