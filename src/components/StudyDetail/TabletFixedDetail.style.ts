import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from 'src/styles/Flex';

const TabletPost = styled.div`
  position: fixed;
  bottom: 5px;
  width: 100%;
  display: none;
  z-index: 9999;
  color: black;
  background-color: ${COLOR.WHITE};
  @media screen and (max-width: 1550px) {
    display: block;
  }
`;
const TabletBlock = styled.div`
  margin: 0 3rem;
  ${Flex({ justifyContent: 'space-between' })};
`;

const TabletMember = styled.div`
  width: 10rem;
  ${Flex({ flexDirection: 'column' })};
`;

const TabletBtn = styled.button`
  border-radius: 1rem;
  background-color: ${COLOR.LOGO_COLOR};
  width: 5rem;
  height: 2rem;
  font-size: 14px;
  font-weight: 800;
`;

export { TabletPost, TabletBlock, TabletMember, TabletBtn };
