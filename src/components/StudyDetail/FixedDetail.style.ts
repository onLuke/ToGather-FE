import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from 'src/styles/Flex';
import sizes from 'src/constants/ScreenSize';

const Post = styled.div`
  width: 300px;
  margin-left: 2rem;
  padding: 1rem 0.75rem;
  line-height: 1.5;
  font-size: 0.875rem;
  height: 300px;
  max-height: calc(100vh - 128px);
  overflow: hidden auto;
  border: 2px solid ${COLOR.GRAY_100};
  box-shadow: rgb(158 167 170) 4px 4px 0px;
  border-radius: 1rem;
  margin-top: 1.5rem;
  position: fixed;
  top: 300px;
  right: 2rem;
  ${Flex({ flexDirection: 'column' })};
  @media screen and (max-width: 1550px) {
    display: none;
  }
`;

const MemberTable = styled.div`
  width: 90%;
  margin: auto auto;
  height: 80%;
  ${Flex({ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' })};
`;

const WrapTableColumn = styled.p`
  width: 100%;
  height: 20%;
  ${Flex({ justifyContent: 'space-between' })};
`;

const TableAttribute = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const TableValue = styled.span`
  font-size: 20px;
`;

const BtnBlock = styled.div`
  height: 20%;
  width: 80%;
  margin: 0 auto;
  ${Flex({ justifyContent: 'space-between' })};
`;

const BackBtn = styled.button`
  border-radius: 1rem;
  background-color: ${COLOR.GRAY_300};
  width: 4rem;
  height: 2rem;
  font-weight: bold;
`;

const Btn = styled.button`
  border-radius: 1rem;
  background-color: ${COLOR.LOGO_COLOR};
  width: 80%;
  height: 2rem;
  font-size: 14px;
  font-weight: 800;
  margin: 0 auto;
`;

export { Post, MemberTable, WrapTableColumn, TableAttribute, TableValue, BtnBlock, BackBtn, Btn };
