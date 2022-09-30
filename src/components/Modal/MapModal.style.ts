import styled from '@emotion/styled';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import COLOR from 'src/constants/colors';
import { css, keyframes } from '@emotion/react';

const MapModalBlock = styled.div``;

const MapContainer = styled(Map)`
  max-width: 100%;
  min-width: 50%;
  min-height: 40rem;
  border-radius: 1rem;
  top: 20%;
  right: 50%;
  transform: translate(50%);
`;

const Marker = styled(MapMarker);

const MarkerContents = styled.div`
  width: 400px;
  height: 200px;
  outline: none;
  border: none;
`;
const CustomOverlay = styled(CustomOverlayMap)`
  width: 300px !important;
  height: 200px !important;
  background-color: red !important;
`;

const button = styled.button`
  width: 1rem;
  height: 1rem;
`;

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

const WrapMessage = styled.div`
  visibility: ${({ isHidden }: { isHidden: boolean }) => (isHidden ? 'hidden' : 'visible')};
  width: 15rem;
  height: 1.5rem;
  text-align: center;
  position: relative;
  top: 2px;
  border-radius: 1rem;
  animation: ${({ isHidden }: { isHidden: boolean }) =>
    isHidden === true
      ? css`
          ${slowHidden} 0.5s 0s forwards
        `
      : ''};
`;

export { MapModalBlock, MapContainer, Marker, CustomOverlay, MarkerContents, WrapMessage, button };
