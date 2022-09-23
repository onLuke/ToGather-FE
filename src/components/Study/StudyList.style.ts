import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Flex from 'src/styles/Flex';
import COLOR from '../../constants/colors';
import FontSizes from 'src/constants/FontSizes';

const Study = styled(Link)`
  ${Flex({ flexDirection: 'column' })};
  padding: 70px 26px 26px 34px;
  width: 370px;
  height: 450px;
  box-shadow: 0px 5px 5px ${COLOR.GRAY_300};
  border: 2px solid ${COLOR.GRAY_100};
  position: relative;
  border-radius: 10%;
  &:hover {
    transfrom: scale(1.3);
  }
`;

const StudyTitle = styled.h1`
  text-align: center;
  font-size: ${FontSizes.Study_Title_Fontsize};
`;

const StudyDeadline = styled.div`
  ${Flex({ columnGap: '10px', justifyContent: 'center' })}
  text-align: center;
  font-size: ${FontSizes.Study_Deadline_FontSize};
  font-weight: ${FontSizes.Study_Deadline_FontWeight};
  color: ${COLOR.GRAY_600};
  margin-bottom: 10%;
`;

const StudyFooter = styled.section`
  ${Flex({ justifyContent: 'space-around', alignItems: 'center', columnGap: '4rem' })};
  font-size: ${FontSizes.Study_Author_Fontsize};
  width: 100%;
  height: 3rem;
  position: absolute;
  left: 0px;
  bottom: 1rem;
`;

const StudyAuthor = styled.div`
  ${Flex({ justifyContent: 'space-between', alignItems: 'center' })};
  width: 4rem;
`;

const StudyViewer = styled.div`
  ${Flex({ rowGap: '0.5rem' })}
`;

export { Study, StudyDeadline, StudyTitle, StudyFooter, StudyAuthor, StudyViewer };
