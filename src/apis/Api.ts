import axios from 'axios';

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
    if (errResStatus === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const prevRefreshToken = localStorage.getItem('refreshToken');
      console.log(prevRefreshToken);
      if (prevRefreshToken) {
        // refersh token을 이용하여 access token 재발행 받기
        return Api.post('/oauth/refresh', prevRefreshToken)
          .then((res) => {
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
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
