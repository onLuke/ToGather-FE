import { techsIdTable } from '../../mocks/TechsTableTest';
import { StudytechsBlock, TechIconContainer } from './StudyTechs.style';
import { techs } from '../@icons/Images';
import styled from '@emotion/styled';

interface props {
  techsList: any[];
}
const StudyTechs = ({ techsList }: props) => {
  return (
    <StudytechsBlock>
      {techsList.map((tech) => (
        <TechIconContainer key={techs[tech.id - 1].tech}>
          {techs[tech.id - 1].icon()}
        </TechIconContainer>
      ))}
    </StudytechsBlock>
  );
};

export default StudyTechs;
