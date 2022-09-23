import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from 'src/contexts/AuthAtom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { checkLogin } from 'src/apis/auth';
import { userAtom, userSelector } from 'src/contexts/UserAtom';
import Api from 'src/apis/Api';
import { HeadersDefaults } from 'axios';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const AuthRedirect = () => {
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const navigation = useNavigate();
  const location = useLocation();
  const { social } = useParams();

  useEffect(() => {
    if (social) {
      getSignToken(social);
    }
  }, []);

  const getSignToken = async (social: string) => {
    let token = new URL(window.location.href).searchParams.get('code') as string;
    try {
      await checkLogin(social, token).then((res) => {
        if (res.data.loginResult) {
          //기존 회원
          const resUser = {
            id: res.data.id,
            nickname: res.data.nickname,
            profileImage: res.data.profileImage,
            techStackDtos: res.data.techStackDtos,
          };
          setAuthToken({ refreshToken: res.data.refreshToken });
          setUser(resUser);
          localStorage.setItem('user', JSON.stringify(resUser));
          Api.defaults.headers = {
            Authorization: `Bearer ${res.data.accessToken}`,
          } as CommonHeaderProperties;
        } else {
          //신규 회원
          setAuthToken({ signUpToken: res.data.signUpToken });
        }
      });
    } catch (e) {
      console.error(`에러 :${e}`);
      alert('잘못된 접근 입니다.');
      navigation('/');
    }
    navigation('/');
  };

  return <div>로딩중</div>;
};

export default AuthRedirect;
