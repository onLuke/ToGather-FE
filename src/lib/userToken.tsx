import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'src/contexts/AuthAtom';

interface data {
  id: string;
  profileImage: string;
  techStackDtos: number[];
  accessToken: string;
  refershToken: string;
}

const userToken = (data: data) => {
  const setAuthToken = useSetRecoilState(authAtom);

  function setUserToken() {
    setAuthToken({ refershToken: data.refershToken });
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.id,
        profileImage: data.profileImage,
        techStackDtos: data.techStackDtos,
      })
    );
  }

  return setUserToken;
};

export default userToken;
