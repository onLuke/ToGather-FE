import { StudySection, Main, CheckInfinity } from './StudyContainer.style';
import StudyList from './StudyList';
import { useRef } from 'react';
import useInfinityScroll from '../../hooks/useInfinityScroll';

const StudyListContainer = () => {
  const observerTargetRef = useRef<HTMLElement>(null);
  useInfinityScroll({ target: observerTargetRef });

  return (
    <Main>
      <StudySection>
        <StudyList />
      </StudySection>
      <CheckInfinity ref={observerTargetRef} className="check" />
    </Main>
  );
};

export default StudyListContainer;
