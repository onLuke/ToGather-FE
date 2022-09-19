import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from 'src/contexts/AuthAtom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { checkLogin } from 'src/apis/auth';

const AuthRedirect = () => {
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const navigation = useNavigate();
  const location = useLocation();
  const { social } = useParams();

  useEffect(() => {
    if (social) {
      getSignToken(social);
    }
  }, []);

  const getSignToken = async (social: string) => {
    let token;
    switch (social) {
      case 'google':
      case 'kakao':
      case 'github':
        token = new URL(window.location.href).searchParams.get('code') as string;
        break;
      case 'naver':
        token = location.hash.split('=')[1].split('&')[0] as string;
        break;
      default:
        alert('새로고침 후 다시 시도해주세요.');
        return null;
    }

    try {
      await checkLogin(social, token).then((res) => {
        // 헤더 토큰 기본 설정 해주기
        if (res.data.loginResult) {
          //기존 회원
          // Api.headers.엑세스토큰키 = 엑세스토큰 값
          setAuthToken({ refreshToken: res.data.refreshToken, accessToken: res.data.accessToken });
          localStorage.setItem('refershToken', res.data.refreshToken);
          localStorage.setItem('accessToken', res.data.accessToken);
        } else {
          //신규 회원
          setAuthToken({ signUpToken: res.data.signUpToken });
        }
      });
    } catch (e) {
      console.error(`에러 :${e}`);
    }
    navigation('/');
  };

  return <div>로딩중</div>;
};

export default AuthRedirect;
