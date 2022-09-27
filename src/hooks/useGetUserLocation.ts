import { useEffect } from 'react';
import { UserLocationAtom } from '../contexts/UserLocationAtom';
import { useRecoilState } from 'recoil';

const useGetUserLocation = () => {
  const [lacation, setLocation] = useRecoilState(UserLocationAtom);

  const success = (event: any) => {
    const latitude = event.coords.latitude;
    const longitude = event.coords.longitude;
    setLocation({ La: latitude, Ma: longitude, regionName: '' });
  };
  const getLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(success);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
};

export default useGetUserLocation;
