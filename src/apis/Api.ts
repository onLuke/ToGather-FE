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
  async (error) => {
    let errResStatus = null;
    const originalRequest = error.config;
    try {
      errResStatus = error.response.status;
    } catch (e) {
      console.error(e);
    }
    // access token이 만료되어 발생하는 경우 or access token이 없는 경우 page reload
    if (errResStatus === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const prevRefreshToken = getCookie('refreshToken');
      if (prevRefreshToken !== 'undefined') {
        // refersh token을 이용하여 access token 재발행 받기
        const newToken = await Api.post('/oauth/refresh', prevRefreshToken, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
          .then((res) => {
            if (res.data.status === 401) {
              return Promise.reject(error);
            }
            const { accessToken, refreshToken } = res.data;
            setCookie('refreshToken', refreshToken, {
              path: '/',
            });
            originalRequest.headers.Authoriztion = `Bearer ${accessToken}`;
            Api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
          })
          .catch(() => {
            return false;
          });
        return Api(originalRequest);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default Api;
