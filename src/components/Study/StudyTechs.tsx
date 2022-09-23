import { techsIdTable } from '../../mocks/TechsTableTest';
import { StudytechsBlock, TechIconContainer } from './StudyTechs.style';
import styled from '@emotion/styled';

const Test = styled.span`
  display: flex;
  justify-content: space-around;
  width: 4rem;
`;
interface props {
  techsList: String[];
}

const StudyTechs = ({ techsList }: props) => {
  return (
    <StudytechsBlock>
      {techsList.map((tech) => (
        <TechIconContainer key={techsIdTable[String(tech)].techName}>
          <Test>{techsIdTable[String(tech)].techName}</Test>
        </TechIconContainer>
      ))}
    </StudytechsBlock>
  );
};

export default StudyTechs;
