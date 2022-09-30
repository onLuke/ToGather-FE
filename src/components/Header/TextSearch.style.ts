import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from 'src/styles/Flex';
import { css, keyframes } from '@emotion/react';

interface iProps {
  textIsOpen: boolean;
  isHidden: boolean;
}

const slowHidden = keyframes(
  css`
    0 {
      opacity: 1;
    }

    100% {
      opacity: 0;
      visibility: hidden;
    }
  `
);

const SearchByTextBlock = styled.div`
  ${Flex({ alignItems: 'center' })};
  width: 25rem;
  visibility: ${({ textIsOpen }: iProps) => (textIsOpen ? 'visible' : 'hidden')};
  left: 40vw;
  position: fixed;
  top: 4rem;
  cursor: default;
  box-shadow: 0px 4px 5px ${COLOR.GRAY_100};
  padding: 1rem;
  z-index: 9999;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;

  animation: ${({ isHidden }: iProps) =>
    isHidden === true
      ? css`
          ${slowHidden} 0.5s 0s forwards
        `
      : ''};
  ${Flex({ justifyContent: 'center' })}

  @media screen and (max-width: 1200px ) {
    left: calc(100% - 70vw);
  }
  @media screen and (max-width: 800px) {
    left: 10%;
  }
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

export { SearchByTextBlock, WrapInput, SearchInput, Btn };
