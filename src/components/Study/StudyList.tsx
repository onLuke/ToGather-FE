import {
  Study,
  StudyDeadline,
  StudyTitle,
  StudyFooter,
  StudyAuthor,
  StudyViewer,
} from './StudyList.style';
import { useRecoilValue } from 'recoil';
import Studytechs from './StudyTechs';
import { getStudyListQuery } from '../../apis/studyQuery';
import { pageNumber, isRecruiting } from '../../contexts/chachingOptionAtom';
import StudyComponent from './StudyComponent';

const StudyList = () => {
  const data = getStudyListQuery();

  return (
    <>
      {Array.isArray(data) &&
        data.map((list) => (
          <StudyComponent
            id={list.id}
            techs={list.techs}
            deadline={list.deadline}
            title={list.search.title}
            author={list.search.author}
          />
          // <Study key={list.id} to="/">
          //   <Studytechs techsList={list.techs} />
          //   <StudyDeadline>
          //     마감 예정일
          //     <span aria-hidden="true">|</span>
          //     {list.deadline}
          //   </StudyDeadline>
          //   <StudyTitle>{list.search.title}</StudyTitle>
          //   <StudyFooter>
          //     <StudyAuthor>
          //       <img src="/" width="36px" height="36px" />
          //       {list.search.author}
          //     </StudyAuthor>
          //     <StudyViewer>viewerArea</StudyViewer>
          //   </StudyFooter>
          // </Study>
        ))}
    </>
  );
};

export default StudyList;
