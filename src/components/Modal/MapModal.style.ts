import styled from '@emotion/styled';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import COLOR from 'src/constants/colors';
import { css, keyframes } from '@emotion/react';
import Flex from 'src/styles/Flex';

const MapModalBlock = styled.div``;

const MapContainer = styled(Map)`
  max-width: 100%;
  min-width: 50%;
  min-height: 40rem;
  border-radius: 1rem;
  top: 20%;
  right: 50%;
  transform: translate(50%);
  z-index: 9999;
  * {
    z-index: 9999 !important;
  }
`;

const MarkerContents = styled.div`
  width: 400px;
  height: 200px;
  outline: none;
  border: none;
  z-index: 9999;
`;
const CustomOverlay = styled(CustomOverlayMap)`
  width: 300px !important;
  height: 200px !important;
  background-color: red !important;
  z-index: 9999;
`;

const button = styled.button`
  width: 1rem;
  height: 1rem;
`;

const Marker = styled(MapMarker)`
  ${Flex({ justifyContent: 'center', alignItems: 'center' })};
  & > img {
    animation: ${({ markerIsOn }: { markerIsOn: boolean }) =>
      markerIsOn
        ? css`
            ${markAnimation} 1s 0s forwards
          `
        : ''};
  }
`;
const markAnimation = keyframes(
  css`
    0 {
      transform: scale(1);
    }

    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  `
);

const WrapMessage = styled.div`
  visibility: ${({ isHidden }: { isHidden: boolean }) => (isHidden ? 'hidden' : 'visible')};
  width: ${({ isMain }: { isMain: boolean }) => (isMain ? '18rem' : '17rem')};
  height: 1.5rem;
  text-align: center;
  margin-top: 2rem;

  border-radius: 1rem;
  z-index: 9999;
`;
const WrapBtn = styled.div`
  ${Flex({ justifyContent: 'center' })};
  z-index: 9999;
`;

const Btn = styled.button`
  visibility: ${({ isHidden }: { isHidden: boolean }) => (isHidden ? 'hidden' : 'visible')};
  animation: ${({ markerIsOpen }: { markerIsOpen: boolean }) =>
    markerIsOpen
      ? css`
          ${markAnimation} 1s 0s forwards
        `
      : ''};
  width: 30%;
  height: 2rem;
  border-radius: 1rem;
  margin: 1rem;
  background-color: ${COLOR.BLUR_100};
`;

export {
  MapModalBlock,
  MapContainer,
  Marker,
  CustomOverlay,
  MarkerContents,
  WrapMessage,
  WrapBtn,
  Btn,
};
