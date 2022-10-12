import styled from '@emotion/styled';
import Flex from 'src/styles/Flex';

const Main = styled.main`
  position: relative;
  top: 4rem;
  width: 1180px;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StudySection = styled.section`
  ${Flex({ flexWrap: 'wrap', columnGap: '2rem', rowGap: '2rem', flexDirection: 'column' })};
  margin-top: 4rem;
  width: 1180px;
  min-height: 50rem;
`;
const CheckInfinity = styled.div`
  height: 5rem;
  width: 100%;
`;

const ChartBlock = styled.div`
  width: 800px;
  height: 25rem;
  cursor: default;
  margin: 0 auto 3rem;
  text-align: center;
  .canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export { StudySection, Main, CheckInfinity, ChartBlock };
