import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from '../../styles/Flex';

const InfoBlock = styled.ul`
  width: 80%;
  height: 10rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  grid-row-gap: 24px;
  row-gap: 24px;
  margin-top: 60px;
`;

const Info = styled.li`
  ${Flex({ alignItems: 'center' })}
  position: relative;
  font-weight: 700;
  font-size: 20px;
`;

const Content = styled.article`
  width: 100%;
  padding: 5rem 10rem;
  font-size: 1.125rem;
  word-break: break-all;
`;

export { InfoBlock, Info, Content };
