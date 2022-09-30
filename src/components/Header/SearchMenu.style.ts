import styled from '@emotion/styled';
import Flex from '../../styles/Flex';
import COLOR from '../../constants/colors';
import FontSizes from '../../constants/FontSizes';
import { css, keyframes } from '@emotion/react';

interface isOpen {
  [key: string]: boolean;
}

interface isOn {
  [key: string]: boolean;
}

interface isScrollOver {
  [key: string]: boolean;
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

const SearchContainer = styled.div`
  display: ${({ isOpen }: isOpen) => (isOpen ? 'block' : 'none')};
  left: 50%;
  transform: translateX(-50%);
  width: 1180px;
  position: fixed;
  top: 4rem;
  cursor: default;
  box-shadow: 0px 4px 5px ${COLOR.GRAY_100};
  padding: 1rem;
  z-index: 9999;
  background-color: ${COLOR.WHITE};

  animation: ${({ isScrollOver }: isScrollOver) =>
    isScrollOver === true
      ? css`
          ${slowHidden} 0.5s 0s forwards
        `
      : ''};
`;

const TechsContainer = styled.div`
  ${Flex({ columnGap: '2rem', flexWrap: 'wrap', rowGap: '1rem' })}
  z-index: 9999;
`;

const TechBtn = styled.button`
  width: 8rem;
  border-radius: 100px;
  gap: 10px;
  padding: 8px 12px 8px 14px;
  ${Flex({ alignItems: 'center' })}
  border: 1px solid ${COLOR.GRAY_100};
  background-color: white;
  svg {
    width: ${FontSizes.techs_Icon_Width};
    height: ${FontSizes.techs_Icon_Height};
  }
  transition: 0.2s;
  transform: ${({ isOn }: isOn) => (isOn ? 'scale(1.2)' : '')};

  tech__Btn:hover {
    transform: translate3d(-2px, -2px, -100px);
  }
`;

export { SearchContainer, TechsContainer, TechBtn, slowHidden };
