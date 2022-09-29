import { techsIdTable } from '../../mocks/TechsTableTest';
import { StudytechsBlock, TechIconContainer } from './StudyTechs.style';
import { techs } from '../@icons/Images';
import styled from '@emotion/styled';

interface props {
  techsList: any[];
}
const StudyTechs = ({ techsList }: props) => {
  console.log(techsList[0]);

  return (
    <StudytechsBlock>
      {techsList.map((tech) => (
        <TechIconContainer key={techs[tech.id].tech}>{techs[tech.id].icon()}</TechIconContainer>
      ))}
    </StudytechsBlock>
  );
};

export default StudyTechs;
