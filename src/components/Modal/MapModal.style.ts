import styled from '@emotion/styled';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import COLOR from 'src/constants/colors';

const MapModalBlock = styled.div`
  position: fixed;
  inset: 0px;
  width:100vw
  height: 100vh;
`;

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
  background-color: ${COLOR.BLUR_100};
  width: 400px;
  height: 200px;
  z-index: 9999;
`;

export { MapModalBlock, MapContainer, Marker, CustomOverlay, MarkerContents };
