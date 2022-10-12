import { StudySection, Main, ChartBlock } from './StudyContainer.style';
import StudyList from './StudyList';
import { useRef } from 'react';
import StatusFilter from './StatusFilter';
import Graph from '../Graphs/Graphs';

const StudyListContainer = () => {
  return (
    <Main>
      <StudySection>
        <ChartBlock>
          <Graph />
        </ChartBlock>
        <StatusFilter />
        <StudyList />
      </StudySection>
    </Main>
  );
};

export default StudyListContainer;
