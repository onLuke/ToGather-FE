import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
  Favorites,
  MenuBtn,
  GpsContainer,
  UserBlock,
  MyPageMenu,
  WrapRightNav,
  UploadStudyLink,
  WrapTextMenu,
} from './HeaderNavigation.styles';
import TextSearch from './TextSearch';
import { GpsIcon } from '../@icons/Images';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import MyPageList from '../mypage/MyPageList';
import { Link, useNavigate } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import { useLocation } from 'react-router-dom';
import { userAtom, userSelector } from 'src/contexts/UserAtom';
import MapModal from '../Modal/MapModal';
import { logout, refresh } from 'src/apis/auth';
import AuthService from 'src/service/AuthService';
import Logo from '../@icons/Logo';
import { UserLocationAtom } from 'src/contexts/UserLocationAtom';

const HeaderNavigation = () => {
  const openModal = useContext(modalContext)?.openModal;
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [textIsOpen, setTextIsOpen] = useState(false);
  const [favoriteIsOpen, setFavoriteIsOpen] = useState(false);
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
  };

  const handleKakaoOpenModal = () => {
    openModal?.(<MapModal />);
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
            <Link to="/">로고</Link>
            <WrapRightNav>
              <CategoryBlock>
                {pathname === '/' && (
                  <>
                    <NavMenu
                      widthProp={NavMenuWidth.search}
                      onMouseEnter={() => {
                        setSearchIsOpen(true);
                        setTextIsOpen(false);
                        setIsHidden(false);
                      }}
                      onMouseLeave={() => setSearchIsOpen(false)}
                      onClick={() => setSearchIsOpen(true)}
                    >
                      <MenuBtn>공고 검색</MenuBtn>
                      <SearchMenu
                        searchIsOpen={searchIsOpen}
                        isHidden={[isHidden, setIsHidden]}
                        textIsOepn={textIsOpen}
                      />
                    </NavMenu>
                    <WrapTextMenu
                      widthProp={NavMenuWidth.search}
                      onMouseEnter={() => {
                        setTextIsOpen(true);
                        setIsHidden(false);
                        setSearchIsOpen(false);
                      }}
                      onMouseLeave={() => setTextIsOpen(false)}
                      onClick={() => setTextIsOpen(true)}
                    >
                      <MenuBtn>제목 검색</MenuBtn>
                      <TextSearch textIsOpen={textIsOpen} isHidden={isHidden} />
                    </WrapTextMenu>
                    <GpsContainer widthProp={NavMenuWidth.gps} onClick={handleKakaoOpenModal}>
                      {}
                      <GpsIcon />
                    </GpsContainer>
                  </>
                )}
                <NavMenu
                  widthProp={NavMenuWidth.favorite}
                  onMouseEnter={() => {
                    setFavoriteIsOpen(true);
                  }}
                  onMouseLeave={() => setFavoriteIsOpen(false)}
                >
                  <MenuBtn onClick={() => setFavoriteIsOpen(true)}>즐겨찾기</MenuBtn>
                  <Favorites favoriteIsOpen={favoriteIsOpen}></Favorites>
                </NavMenu>
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
                      <MenuBtn onClick={() => setMyPageIsOpen(true)}>마이 페이지</MenuBtn>
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
