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
import Api from 'src/apis/Api';
import { useQuery } from 'react-query';
import { config } from 'process';
import axios from 'axios';

const MapModal = () => {
  const initialLocation = useGetUserLocation();
  const [options, setOptions] = useRecoilState(NeedValueAtom);
  const [location, setlocation] = useRecoilState(UserLocationAtom);
  const setFilter = useSetRecoilState(LocationFilterAtom);
  const [isHidden, setIsHidden] = useState(true);
  const reset = useResetRecoilState(UserLocationAtom);
  const [status, setStatus] = useState<any>();

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

  const handleSubmit = async () => {
    setFilter({ latitude: location.La, longitude: location.Ma });
    const res = await Api.get(
      `https://dokuny.blog/projects/search/distance?distance=3&latitude=${location.La}&longitude=${location.Ma}`
      /*       {
        params: {
          distance: 1,
          latitude: 37.500789,
          longitude: 127.036909,
        },
      } */
    );
    setStatus([{ title: '제목', latitude: 127.04, longitude: 135.11 }]);
    return res;
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
          {
            !isHidden && location && (
              <>
                <WrapMessage isMain={pathname === '/'} isHidden={isHidden}>
                  {location.regionName}
                </WrapMessage>
                <WrapBtn>
                  <Btn isHidden={isHidden} onClick={handleSubmit}>
                    제출하기
                  </Btn>
                </WrapBtn>
              </>
            )
            /*             : !isHidden &&
              location && (
                <WrapMessage isMain={pathname === '/'} isHidden={isHidden}>
                  {location.regionName}
                </WrapMessage>
              ) */
          }
        </MapMarker>
        {/* 
        {pathname === '/' &&
          status &&
          location &&
          status.map((el: any) => (
            <>
              <MapMarker position={location && { lat: status.latitude, lng: status.longitude }}>
                <WrapMessage>{'제목'}</WrapMessage>
              </MapMarker>
            </>
          ))} */}
      </MapContainer>
    </>
  );
};

export default MapModal;
