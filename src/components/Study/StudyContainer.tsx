import { StudySection, Main, CheckInfinity } from './StudyContainer.style';
import StudyList from './StudyList';
import { useRef } from 'react';

const StudyListContainer = () => {
  return (
    <Main>
      <StudySection>
        <StudyList />
      </StudySection>
    </Main>
  );
};

export default StudyListContainer;
