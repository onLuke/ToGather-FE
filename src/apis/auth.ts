import axios from 'axios';
import Api from './Api';

export const checkLogin = (social: string, token: string) =>
  Api.get(`/oauth/login/${social}?code=${token}`);

export const signUp = (data: any, token: string) => {
  return Api.post(`/oauth/signup`, data, {
    headers: {
      signUpToken: token,
    },
  });
};

export const refresh = (refreshToken: string) =>
  axios.post(`/oauth/refresh`, refreshToken, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });

export const logout = () => Api.post(`/oauth/logout`);
