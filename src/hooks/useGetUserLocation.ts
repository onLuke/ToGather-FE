import { useEffect, useState } from 'react';

const useGetUserLocation = () => {
  const [location, setLocation] = useState({ La: 0, Ma: 0, regionName: '' });

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

  return location;
};

export default useGetUserLocation;
