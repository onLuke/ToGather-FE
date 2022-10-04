import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from 'src/styles/Flex';
import { css, keyframes } from '@emotion/react';

interface iProps {
  textIsOpen: boolean;
  isHidden: boolean;
}

const slowHidden = keyframes();

const WrapSearch = styled.div`
  width: 20rem;
  ${Flex({ alignItems: 'center' })};
`;

const SelectCategory = styled.select`
  width: 6rem;
  outline: none;
  ${Flex({ justifyContent: 'center', alignItems: 'center' })}
  height: 2rem;
`;

const Options = styled.option`
  text-align: 5rem;
`;

const WrapInput = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  width: 250px;
  border-bottom: 1px solid rgb(221, 221, 221);
`;
const SearchInput = styled.input`
  height: 35px;
  border: none;
  flex-grow: 1;
  padding: 10px 7px;
  background-color: transparent;
  outline: none;
`;

const Btn = styled.button`
  margin-left: 5px;
  width: 1.5rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  ${Flex({ alignItems: 'center' })}
`;

export { WrapSearch, SelectCategory, Options, WrapInput, SearchInput, Btn };
