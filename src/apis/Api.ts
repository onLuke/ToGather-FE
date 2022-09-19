import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
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
      if (prevRefreshToken) {
        // refersh token을 이용하여 access token 재발행 받기
        return axios
          .post('', {})
          .then((res) => {
            const { accessToken, refreshToken } = res.data;

            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            // 헤더 토큰 기본 설정 해주기
            // originalRequest.headers.엑세스토큰키 = 엑세스토큰 값
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
