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
} from './StudyList.style';
import StudyTechs from './StudyTechs';

interface Iprops {
  id: any;
  techs: any;
  deadline: any;
  title: any;
  author: any;
  image: any;
}

const StudyComponent = ({ id, techs, deadline, title, author, image }: Iprops) => {
  return (
    <Study to={`/studyDetail/${id}`}>
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
        <StudyViewer>{author}</StudyViewer>
      </StudyFooter>
    </Study>
  );
};

export default StudyComponent;
