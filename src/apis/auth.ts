import Api from './Api';

interface GenericResponse {
  loginResult: boolean;
  accessToken: string;
  refreshToken: string;
  signUpToken: string;
  user: any;
}

export const checkLogin = (social: string, token: string) =>
  Api.post(`/oauth/login/${social}`, token);

export const userLogin = (data: any, token: string) => {
  return Api.post(`/oauth/signup`, data, {
    headers: {
      signUpToken: token,
    },
  });
};

export const checkToken = () => {};

export const userLogout = () => {};

export const legister = () => {};
