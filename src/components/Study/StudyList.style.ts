import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Flex from 'src/styles/Flex';
import COLOR from '../../constants/colors';
import FontSizes from 'src/constants/FontSizes';
import LineClamp from 'src/styles/LineClamp';

const WrapStudy = styled.div`
  display: flex;
  grid-gap: 35px;
  gap: 35px;
  flex-wrap: wrap;
  padding: 0;
`;
const Study = styled(Link)`
  ${Flex({ flexDirection: 'column' })};
  padding: 55px 26px 38px 34px;
  width: 370px;
  height: 450px;
  box-shadow: 0px 5px 5px ${COLOR.GRAY_300};
  border: 2px solid ${COLOR.GRAY_100};
  position: relative;
  border-radius: 10%;
  /* &:hover {
    transfrom: scale(1.3);
  } */
  cursor: pointer;
`;

const StudyTitle = styled.h1`
  text-align: center;
  font-size: ${FontSizes.Study_Title_Fontsize};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
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
  ${Flex({ justifyContent: 'space-between', alignItems: 'center', columnGap: '4rem' })};
  font-size: ${FontSizes.Study_Author_Fontsize};
  width: 80%;
  margin: 0 1rem;
  height: 3rem;
  position: absolute;
  left: 0px;
  bottom: 1rem;
`;

const StudyAuthor = styled.div`
  ${Flex({ justifyContent: 'space-between', alignItems: 'center', columnGap: '0.5rem' })};
  max-width: 10rem;
  img {
    border-radius: 1rem;
    object-fit: cover;
  }
`;

const StudyViewer = styled.div`
  ${Flex({ rowGap: '0.5rem' })};
`;

const AuthorSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
const WrapIsRecruiting = styled.div`
  width: 90%;
  height: 2rem;
  ${Flex({ justifyContent: 'flex-end', alignItems: 'center' })};
  margin-bottom: 1rem;
`;
const IsRecruiting = styled.div`
  width: 4rem;
  height: 2rem;
  border-radius: 1rem;
  ${Flex({ justifyContent: 'center', alignItems: 'center' })};
  background-color: ${({ isRecruiting }: { isRecruiting: boolean }) =>
    isRecruiting ? `${COLOR.BLUE}` : `${COLOR.GRAY_200}}`};
`;

export {
  WrapStudy,
  Study,
  StudyDeadline,
  StudyTitle,
  StudyFooter,
  StudyAuthor,
  StudyViewer,
  AuthorSpan,
  IsRecruiting,
  WrapIsRecruiting,
};
