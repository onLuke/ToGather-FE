import { StudySection, Main } from './StudyContainer.style';
import StudyList from './StudyList';
import { useRef } from 'react';
import useInfinityScroll from '../../hooks/useInfinityScroll';

const StudyListContainer = () => {
  const observerTargetRef = useRef<HTMLElement>(null);
  useInfinityScroll({ target: observerTargetRef });

  return (
    <Main>
      <StudySection ref={observerTargetRef}>
        <StudyList />
      </StudySection>
    </Main>
  );
};

export default StudyListContainer;
