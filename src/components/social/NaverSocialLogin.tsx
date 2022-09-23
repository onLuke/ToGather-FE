import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { NaverLoginButton } from './SocialLogin.styles';

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  import.meta.env.VITE_NAVER_KEY
}&redirect_uri=${import.meta.env.VITE_NAVER_URL}&scope=email`;
const NaverSocialLogin = () => {
  // const naverRef: any = useRef();
  // const { naver }: any = window;

  // const initializeNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: NAVER_CLIENT_ID,
  //     callbackUrl: NAVER_CALLBACK_URL,
  //     isPopup: false,
  //     loginButton: {
  //       color: 'green', // 색상
  //       type: 3, // 버튼 크기
  //       height: '60', // 버튼 높이
  //     },
  //     callbackHandle: true,
  //   });
  //   naverLogin.init();
  // };

  // useEffect(() => {
  //   initializeNaverLogin();
  // }, []);

  // const handleNaverLogin = () => {
  //   naverRef.current.children[0].click();
  // };

  const getAutoToken = () => {
    location.href = NAVER_AUTH_URL;
  };

  return (
    <>
      {/* <div style={{ display: 'none' }} ref={naverRef} id="naverIdLogin" /> */}
      <NaverLoginButton onClick={getAutoToken}>
        <svg width="48" height="48" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet">
          <g fill="none" fillRule="evenodd">
            <path
              fill="currentColor"
              d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
            ></path>
            <path fill="#FFF" d="M21 25.231V34h-7V15h7l6 8.769V15h7v19h-7l-6-8.769z"></path>
          </g>
        </svg>
      </NaverLoginButton>
    </>
  );
};

export default NaverSocialLogin;
