import { useContext, useEffect, useState } from 'react';
import { modalContext } from '../../contexts/ModalContext';
import NavMenuWidth from 'src/constants/NavMenuWidth';
import LoginModal from '../Login/LoginModal';
import {
  NavigationContainer,
  NavigationBlock,
  Wrapper,
  LoginButton,
  CategoryBlock,
  NavMenu,
  MenuBtn,
  GpsContainer,
  UserBlock,
  MyPageMenu,
  WrapRightNav,
  UploadStudyLink,
  LogoTitle,
} from './HeaderNavigation.styles';
import TextSearch from './TextSearch';
import { GpsIcon } from '../@icons/Images';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import MyPageList from '../mypage/MyPageList';
import { useNavigate } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import { useLocation } from 'react-router-dom';
import { userAtom, userSelector } from 'src/contexts/UserAtom';
import MapModal from '../Modal/MapModal';
import AuthService from 'src/service/AuthService';
import { UserLocationAtom } from 'src/contexts/UserLocationAtom';
import LogoImage from 'src/components/@icons/logo2_express.svg';

const HeaderNavigation = () => {
  const openModal = useContext(modalContext)?.openModal;
  const context = useContext(modalContext);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [textIsOpen, setTextIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [myPageIsOpen, setMyPageIsOpen] = useState(false);
  const user = useRecoilValue(userSelector);
  const resetUser = useResetRecoilState(userAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reset = useResetRecoilState(UserLocationAtom);
  const { refreshService, logoutService } = AuthService();

  const refersh = async () => {
    if (user.nickname) {
      const response = await refreshService();
    }
  };

  useEffect(() => {
    refersh();
  }, [user.nickname]);

  const handleOpenModal = () => {
    openModal?.(<LoginModal />);
    setSearchIsOpen(false);
  };

  const handleKakaoOpenModal = () => {
    openModal?.(<MapModal closeModal={context?.closeModal} />);
    setSearchIsOpen(false);
  };

  const handleLogout = async () => {
    // logout API 호출
    const response = await logoutService();
    resetUser();
    navigate('/');
  };

  return (
    <>
      <NavigationContainer>
        <NavigationBlock>
          <Wrapper>
            <LogoTitle to="/">
              <img src={LogoImage} alt="" width="200px" height="60px" />
            </LogoTitle>
            <WrapRightNav onMouseLeave={() => setSearchIsOpen(false)}>
              <CategoryBlock>
                {pathname === '/' && (
                  <>
                    <TextSearch />
                    <NavMenu
                      widthProp={NavMenuWidth.search}
                      onMouseEnter={() => {
                        setSearchIsOpen(true);
                        setTextIsOpen(false);
                        setIsHidden(false);
                      }}
                      onClick={() => setSearchIsOpen(true)}
                    >
                      <MenuBtn active={searchIsOpen}>공고 검색</MenuBtn>
                      <SearchMenu
                        searchIsOpen={searchIsOpen}
                        isHidden={[isHidden, setIsHidden]}
                        textIsOepn={textIsOpen}
                      />
                    </NavMenu>
                    <GpsContainer widthProp={NavMenuWidth.gps} onClick={handleKakaoOpenModal}>
                      {}
                      <GpsIcon />
                    </GpsContainer>
                  </>
                )}
                <NavMenu>
                  <UploadStudyLink to="/uploadStudy" onClick={reset}>
                    공고 등록
                  </UploadStudyLink>
                </NavMenu>
              </CategoryBlock>
              <UserBlock>
                {user.id ? (
                  <>
                    <MyPageMenu
                      widthProp={NavMenuWidth.myPage}
                      onMouseEnter={() => {
                        setMyPageIsOpen(true);
                      }}
                      onMouseLeave={() => setMyPageIsOpen(false)}
                    >
                      <MenuBtn active={myPageIsOpen}>마이 페이지</MenuBtn>
                      <MyPageList myPageIsOpen={myPageIsOpen} />
                    </MyPageMenu>
                    <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
                  </>
                ) : (
                  <LoginButton onClick={handleOpenModal}>로그인</LoginButton>
                )}
              </UserBlock>
            </WrapRightNav>
          </Wrapper>
        </NavigationBlock>
      </NavigationContainer>
    </>
  );
};

export default HeaderNavigation;
