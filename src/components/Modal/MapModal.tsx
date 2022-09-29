import { useEffect, useMemo, useState } from 'react';
import { MapModalBlock, MapContainer, CustomOverlay, WrapMessage } from './MapModal.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import getAddr from 'src/hooks/useGetRegionName';
import { useCallback } from 'react';
import { useResetRecoilState } from 'recoil';

const MapModal = () => {
  const initialLocation = useGetUserLocation();
  const [location, setlocation] = useRecoilState(UserLocationAtom);
  const [isHidden, setIsHidden] = useState(true);

  const { pathname } = useLocation();

  const regionPromise = async (mouseEvent: kakao.maps.event.MouseEvent) => {
    try {
      const lat = mouseEvent.latLng.getLat();
      const lng = mouseEvent.latLng.getLng();
      if (pathname === '/uploadStudy') {
        setlocation({ La: lat, Ma: lng, regionName: '' });
      }

      const result = await getAddr(lat, lng);

      setlocation({ La: lat, Ma: lng, regionName: result });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickMap = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    regionPromise(mouseEvent);
    setIsHidden(false);
  };
  console.log(location);

  return (
    <MapContainer
      center={{ lat: initialLocation.La, lng: initialLocation.Ma }}
      onClick={handleClickMap}
      isPanto={true}
      class="map"
      level={5}
      draggable
    >
      <MapMarker
        position={
          location.La !== 0
            ? { lat: location.La, lng: location.Ma }
            : { lat: initialLocation.La, lng: initialLocation.Ma }
        }
      >
        {!isHidden && <WrapMessage isHidden={isHidden}>{location.regionName}</WrapMessage>}
      </MapMarker>
    </MapContainer>
  );
};

export default MapModal;
