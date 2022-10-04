import { useRecoilState } from 'recoil';
import Api from 'src/apis/Api';
import { checkLogin, logout, refresh, signUp } from 'src/apis/auth';
import { authAtom } from 'src/contexts/AuthAtom';
import { userAtom } from 'src/contexts/UserAtom';
import { getCookie, setCookie } from 'src/lib/cookies';

interface Iform {
  profileImage: string;
  nickname: string;
  techStackDtos: number[];
}

const AuthService = () => {
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const checkLoginService = async (social: string, token: string) => {
    const response = await checkLogin(social, token);

    if (response.data.loginResult) {
      //기존 회원
      const resUser = {
        id: response.data.id,
        nickname: response.data.nickname,
        profileImage: response.data.profileImage,
        techStackDtos: response.data.techStackDtos,
      };
      setCookie('refreshToken', response.data.refreshToken, {
        path: '/',
        // secure: true,
        // httpOnly: true,
      });

      setUser(resUser);
      setAuthToken({
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
      });
      Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    } else if (response.data.errorMessage) alert(response.data.errorMessage);
    else if (response.data.signUpToken) setAuthToken({ signUpToken: response.data.signUpToken });
    return response;
  };

  const registerService = async (form: Iform) => {
    const response = await signUp(form, authToken.signUpToken);

    if (response.data.status === 400) {
      alert(response.data.errorMessage);
    }

    const resUser = {
      id: response.data.id,
      nickname: response.data.nickname,
      profileImage: response.data.profileImage,
      techStackDtos: response.data.techStackDtos,
    };

    setCookie('refreshToken', response.data.refreshToken, {
      path: '/',
    });
    setUser(resUser);
    setAuthToken({
      refreshToken: response.data.refreshToken,
      accessToken: response.data.accessToken,
    });
    Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

    return response;
  };

  const refreshService = async () => {
    const refreshCookie = getCookie('refreshToken');

    const response = await refresh(refreshCookie);

    try {
      if (response.data.status === 401) {
        throw new Error(response.data.errorMessage);
      }

      setCookie('refreshToken', response.data.refreshToken, {
        path: '/',
      });
      setAuthToken({
        refreshToken: response.data.refreshToken,
        accessToken: response.data.accessToken,
      });
      console.log(`newRefreshToken: ${response.data.refreshToken}`);
      Api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    } catch (e) {
      console.error(`에러 : ${e}`);
    }
  };

  const logoutService = async () => {
    const response = await logout();

    setCookie('refreshToken', '', {
      path: '/',
    });
    localStorage.removeItem('user');

    Api.defaults.headers.common['Authorization'] = '';
    setAuthToken({});
    return response;
  };

  return { checkLoginService, registerService, refreshService, logoutService };
};

export default AuthService;
