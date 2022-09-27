import { useEffect, useState } from 'react';
import { MapModalBlock, MapContainer } from './MapModal.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import getAddr from 'src/hooks/useGetRegionName';

const MapModal = () => {
  useGetUserLocation();
  const [location, setlocation] = useRecoilState(UserLocationAtom);
  const [info, setInfo] = useState<kakao.maps.LatLng | null>(null);

  const { pathname } = useLocation();

  const regionPromise = async () => {
    try {
      if (info && pathname === '/uploadStudy') {
        const result = await getAddr(info.getLat(), info.getLng());
        setlocation({ ...location, regionName: result });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    regionPromise();
  }, [info]);

  const handleClickMap = (target: kakao.maps.Map, mouseEvent: kakao.maps.event.MouseEvent) => {
    regionPromise();
    setInfo(mouseEvent.latLng);
  };

  console.log(location);

  return (
    <MapModalBlock className="modal2">
      <MapContainer
        center={{ lat: location.La, lng: location.Ma }}
        onClick={handleClickMap}
        isPanto={true}
        class="map"
        level={5}
        draggable
      >
        <MapMarker
          position={
            info
              ? { lat: info.getLat(), lng: info.getLng() }
              : { lat: location.La, lng: location.Ma }
          }
        ></MapMarker>
      </MapContainer>
    </MapModalBlock>
  );
};

export default MapModal;
