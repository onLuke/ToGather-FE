import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredStudy } from 'src/contexts/SearchTechsAtom';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { MyProjectInner } from '../chat/MyProjectList.stylese';
import StudyComponent from '../Study/StudyComponent';
import { MyProjectBlock, Wrapper } from './MyProject.styles';

const MyProject = () => {
  const myProject = useRecoilValue(filteredStudy);
  const myProjectMock = myProject.filter((_, idx) => idx < 2);

  return (
    <MyProjectBlock>
      <Breadcrumb>마이 페이지 - 내 작성글</Breadcrumb>
      <Wrapper>
        {/* <div>등록된 공고가 없습니다.</div> */}
        {myProjectMock.map((list: any) => (
          <MyProjectInner key={list.id}>
            <div>
              <StudyComponent
                id={list.id}
                techs={list.techs}
                deadline={list.deadline}
                title={list.search.title}
                author={list.search.author}
              />
            </div>
            <div>요청인원</div>
            <div>유저 1</div>
            <div>유저 2</div>
          </MyProjectInner>
        ))}
      </Wrapper>
    </MyProjectBlock>
  );
};

export default MyProject;
