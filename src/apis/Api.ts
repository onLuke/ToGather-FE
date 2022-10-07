import axios from 'axios';
import { getCookie, setCookie } from 'src/lib/cookies';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    let errResStatus = null;
    const originalRequest = error.config;

    try {
      errResStatus = error.response.status;
    } catch (e) {
      console.error(e);
    }
    // access token이 만료되어 발생하는 경우
    console.log(originalRequest.url);
    // originalRequest로 재요청 보내야 하는 로직 생각 해야함
    if (errResStatus === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const prevRefreshToken = getCookie('refreshToken');
      if (prevRefreshToken !== 'undefined') {
        // refersh token을 이용하여 access token 재발행 받기
        return Api.post('/oauth/refresh', prevRefreshToken)
          .then((res) => {
            if (res.data.status === 401) {
              return Promise.reject(error);
            }

            const { accessToken, refreshToken } = res.data;
            setCookie('refreshToken', res.data.refreshToken, {
              path: '/',
            });
            debugger;
            originalRequest.headers.Authoriztion = `Bearer ${accessToken}`;
            Api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
          })
          .catch(() => {
            window.location.href = '/';
            return false;
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default Api;
