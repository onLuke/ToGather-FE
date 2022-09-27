import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from 'src/service/AuthService';

const AuthRedirect = () => {
  const navigation = useNavigate();
  const { social } = useParams();
  const { checkLoginService } = AuthService();

  useEffect(() => {
    if (social) {
      getSignToken(social);
    }
  }, []);

  const getSignToken = async (social: string) => {
    let token = new URL(window.location.href).searchParams.get('code') as string;
    try {
      const response = await checkLoginService(social, token);
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
