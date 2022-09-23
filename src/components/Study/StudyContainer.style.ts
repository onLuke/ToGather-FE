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
  z-index: -1;
`;

const StudySection = styled.section`
  ${Flex({ flexWrap: 'wrap', columnGap: '2rem', rowGap: '2rem' })};
  margin-top: 5rem;
  width: 1180px;
  min-height: 50rem;
  box-shadow: ;
`;

export { StudySection, Main };
