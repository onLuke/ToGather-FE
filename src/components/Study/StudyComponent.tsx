import React from 'react';
import { Link } from 'react-router-dom';
import {
  Study,
  StudyAuthor,
  StudyDeadline,
  StudyFooter,
  StudyTitle,
  StudyViewer,
  AuthorSpan,
  IsRecruiting,
  WrapIsRecruiting,
} from './StudyList.style';
import StudyTechs from './StudyTechs';

interface Iprops {
  id: any;
  techs: any;
  deadline: any;
  title: any;
  author: any;
  image: any;
  status: any;
}

const StudyComponent = ({ id, techs, deadline, title, author, image, status }: Iprops) => {
  return (
    <Study to={`/studyDetail/${id}`}>
      <WrapIsRecruiting>
        <IsRecruiting isRecruiting={status === 'RECRUITING'}>
          {status === 'RECRUITING' ? '모집중' : '모집마감'}
        </IsRecruiting>
      </WrapIsRecruiting>
      <StudyTechs techsList={techs} />
      <StudyDeadline>
        마감 예정일
        <span aria-hidden="true">|</span>
        {deadline}
      </StudyDeadline>
      <StudyTitle>{title}</StudyTitle>
      <StudyFooter>
        <StudyAuthor>
          <img src={image} width="36px" height="36px" />
          <AuthorSpan>{author}</AuthorSpan>
        </StudyAuthor>
      </StudyFooter>
    </Study>
  );
};

export default StudyComponent;
