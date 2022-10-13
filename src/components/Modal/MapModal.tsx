import { useEffect, useState } from 'react';
import { MapContainer, WrapMessage, Marker, Btn, WrapBtn, markAnimation } from './MapModal.style';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { UserLocationAtom } from '../../contexts/UserLocationAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import getAddr from 'src/hooks/useGetRegionName';
import { useResetRecoilState } from 'recoil';
import { NeedValueAtom } from 'src/contexts/needValue';
import { LocationFilterAtom } from 'src/contexts/FilterOptionAtom';
import Api from 'src/apis/Api';

const MapModal = ({ closeModal }: any) => {
  const initialLocation = useGetUserLocation();
  const [options, setOptions] = useRecoilState(NeedValueAtom);
  const [location, setlocation] = useRecoilState(UserLocationAtom);
  const setFilter = useSetRecoilState(LocationFilterAtom);
  const [isHidden, setIsHidden] = useState(true);
  const reset = useResetRecoilState(UserLocationAtom);
  const [status, setStatus] = useState<any>(null);
  const [markerIsOpen, setMarkerIsOpen] = useState({ id: 0, open: false });
  const [markerIsOn, setMarkerIsOn] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(true);
  const navigate = useNavigate();
  const [level, setLevel] = useState(5);

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
    setMarkerIsOpen({ ...markerIsOpen, open: false });
  };

  const handleSubmit = async () => {
    setFilter({ latitude: location.La, longitude: location.Ma });
    const mapLevel = level - 3 < 0 ? 1 : level - 3;
    const res = await Api.get(
      `https://dokuny.blog/projects/search/distance?distance=${mapLevel}&latitude=${location.La}&longitude=${location.Ma}`
    );
    setStatus(res.data);
    setMarkerIsOn(true);
    setCurrentMarker(false);
    return res;
  };

  const handleClose = () => {
    closeModal();
  };

  const handleLink = (e: any, id: string) => {
    navigate(`/studyDetail/${id}`);
    closeModal();
  };

  const handleMarker = (id: number) => {
    setMarkerIsOpen({ ...markerIsOpen, id: id, open: !markerIsOpen.open });
    setIsHidden(true);
    setCurrentMarker(false);
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
        onZoomChanged={(map: any) => setLevel(map.getLevel())}
      >
        {currentMarker && (
          <Marker
            position={
              location && location.La !== 0
                ? { lat: location.La, lng: location.Ma }
                : { lat: initialLocation.La, lng: initialLocation.Ma }
            }
          >
            {!isHidden && location && (
              <>
                <WrapMessage isMain={pathname === '/'} isHidden={isHidden}>
                  {location.regionName}
                </WrapMessage>

                <WrapBtn>
                  <Btn isHidden={isHidden} onClick={pathname === '/' ? handleSubmit : handleClose}>
                    제출하기
                  </Btn>
                </WrapBtn>
              </>
            )}
          </Marker>
        )}

        {status &&
          status.map((el: any) => (
            <Marker
              key={el.id}
              position={{ lat: el.location.latitude, lng: el.location.longitude }}
              onClick={() => {
                handleMarker(el.id);
              }}
              markerIsOn={markerIsOn}
            >
              {markerIsOpen.id === el.id && markerIsOpen.open && (
                <>
                  <WrapMessage>{el.location.address}</WrapMessage>
                  <WrapBtn>
                    <Btn
                      markerIsOpen={markerIsOpen.id === el.id && markerIsOpen.open}
                      onClick={(e: any) => handleLink(e, el.id)}
                    >
                      공고보러가기
                    </Btn>
                  </WrapBtn>
                </>
              )}
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};

export default MapModal;
