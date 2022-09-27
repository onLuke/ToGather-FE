/*global kakao*/

const getAddr = (lat: number, lng: number) => {
  return new Promise<string>((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = { ...result };
        const regionName = arr[0].address.address_name;
        resolve(regionName);
      }
    });
  });
};

export default getAddr;
