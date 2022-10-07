import { StudySection, Main, CheckInfinity } from './StudyContainer.style';
import StudyList from './StudyList';
import { useRef } from 'react';
import StatusFilter from './StatusFilter';

const StudyListContainer = () => {
  return (
    <Main>
      <StatusFilter />
      <StudySection>
        <StudyList />
      </StudySection>
    </Main>
  );
};

export default StudyListContainer;
