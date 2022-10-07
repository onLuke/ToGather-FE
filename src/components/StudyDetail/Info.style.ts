import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from '../../styles/Flex';

const InfoBlock = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-row-gap: 24px;
`;

const Info = styled.li`
  ${Flex({ alignItems: 'center' })}
  position: relative;
  font-weight: 700;
  font-size: 20px;

  label {
    margin-right: 1rem;
    color: #cbcbcb;
    font-weight: 100;
  }
`;

const ContetnBlock = styled.div`
  margin-bottom: 3rem;
  border-bottom: 3px solid #f2f2f2;
`;

const ContentTitle = styled.h1`
  width: 100%;
  margin-top: 3rem;
  padding-bottom: 2rem;
  border-bottom: 3px solid #f2f2f2;
`;

const Content = styled.article`
  width: 80%;
  margin: 3rem auto;
  font-size: 1.125rem;
  word-break: break-all;
`;

export { InfoBlock, Info, ContetnBlock, ContentTitle, Content };
