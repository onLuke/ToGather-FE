import Api from './Api';

interface GenericResponse {
  loginResult: boolean;
  accessToken: string;
  refreshToken: string;
  signUpToken: string;
  user: any;
}

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
  Api.post(`/oauth/refresh`, refreshToken, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });

export const logout = () => Api.post(`/oauth/logout`);
