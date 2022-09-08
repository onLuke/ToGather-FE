import React from 'react';
import { NaverLoginButton } from './SocialLogin.styles';

const NaverSocialLogin = () => {
  return (
    <NaverLoginButton>
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
  );
};

export default NaverSocialLogin;
