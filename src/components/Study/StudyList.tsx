import {
  Study,
  StudyDeadline,
  StudyTitle,
  StudyFooter,
  StudyAuthor,
  StudyViewer,
} from './StudyList.style';
import { StudyListTest } from '../../mocks/StudyListTest';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import Studytechs from './StudyTechs';
import { filteredStudy } from '../../contexts/SearchTechsAtom';
import { getRes } from '../../contexts/getStudyAtom';
import { useEffect } from 'react';
import { getStudyListQuery } from '../../apis/studyQuery';
import { getStudy } from '../../apis/study';

const StudyList = () => {
  const data = getStudyListQuery();

  return (
    <>
      {Array.isArray(data) &&
        data.map((list) => (
          <Study key={list.id} to="/">
            <Studytechs techsList={list.techs} />
            <StudyDeadline>
              마감 예정일
              <span aria-hidden="true">|</span>
              {list.deadline}
            </StudyDeadline>
            <StudyTitle>{list.search.title}</StudyTitle>
            <StudyFooter>
              <StudyAuthor>
                <img src="/" width="36px" height="36px" />
                {list.search.author}
              </StudyAuthor>
              <StudyViewer>viewerArea</StudyViewer>
            </StudyFooter>
          </Study>
        ))}
    </>
  );
};

export default StudyList;
