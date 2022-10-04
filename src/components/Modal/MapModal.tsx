import { useEffect, useState } from 'react';
import { MapContainer, WrapMessage, Btn, WrapBtn } from './MapModal.style';
import { MapMarker } from 'react-kakao-maps-sdk';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import getAddr from 'src/hooks/useGetRegionName';
import { useResetRecoilState } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
import { LocationFilterAtom } from 'src/contexts/FilterOptionAtom';

const MapModal = () => {
  const initialLocation = useGetUserLocation();
  const [options, setOptions] = useRecoilState(NeedValueAtom);
  const [location, setlocation] = useRecoilState(UserLocationAtom);
  const setFilter = useSetRecoilState(LocationFilterAtom);
  const [isHidden, setIsHidden] = useState(true);
  const reset = useResetRecoilState(UserLocationAtom);

  const { pathname } = useLocation();

  useEffect(() => {
    reset();
  }, [pathname]);

  const regionPromise = async (lat: number, lng: number) => {
    try {
      const result = await getAddr(lat, lng);
      setlocation({ La: lat, Ma: lng, regionName: result });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickMap = async (target: any, mouseEvent: kakao.maps.event.MouseEvent) => {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setlocation({ La: lat, Ma: lng, regionName: '' });
    await regionPromise(lat, lng);
    setIsHidden(false);
    setOptions({ ...options, Location: false });
  };

  const handleSubmit = () => {
    setFilter({ latitude: location.La, longitude: location.Ma });
  };

  return (
    <>
      <MapContainer
        onClick={handleClickMap}
        center={
          initialLocation !== undefined && { lat: initialLocation.La, lng: initialLocation.Ma }
        }
        className="map"
        level={5}
      >
        <MapMarker
          position={
            location && location.La !== 0
              ? { lat: location.La, lng: location.Ma }
              : { lat: initialLocation.La, lng: initialLocation.Ma }
          }
        >
          {pathname === '/'
            ? !isHidden &&
              location && (
                <>
                  <WrapMessage isMain={pathname === '/'} isHidden={isHidden}>
                    {location.regionName}
                  </WrapMessage>
                  <WrapBtn>
                    <Btn isHidden={isHidden} onClick={handleSubmit}>
                      검색하기
                    </Btn>
                  </WrapBtn>
                </>
              )
            : !isHidden &&
              location && (
                <WrapMessage isMain={pathname === '/'} isHidden={isHidden}>
                  {location.regionName}
                </WrapMessage>
              )}
        </MapMarker>
      </MapContainer>
    </>
  );
};

export default MapModal;
