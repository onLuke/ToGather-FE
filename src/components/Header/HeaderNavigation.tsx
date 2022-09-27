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
  SearchByText,
  UploadStudyLink,
} from './HeaderNavigation.styles';
import { GpsIcon } from '../@icons/Images';
import { useRecoilState, useResetRecoilState } from 'recoil';
import MyPageList from '../mypage/MyPageList';
import { Link, useNavigate } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import { useLocation } from 'react-router-dom';
import { userAtom, userSelector } from 'src/contexts/UserAtom';

const HeaderNavigation = () => {
  const openModal = useContext(modalContext)?.openModal;
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [favoriteIsOpen, setFavoriteIsOpen] = useState(false);
  const [gpsIsOpen, setGpsIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [myPageIsOpen, setMyPageIsOpen] = useState(false);
  const [user, setUser] = useRecoilState(userSelector);
  const resetUser = useResetRecoilState(userAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const refersh = async () => {
    /* const response = await api.post('refresh');
     * const accessToken = response.accessToken;
     * Api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
     *
     */
  };

  useEffect(() => {}, []);

  const handleOpenModal = () => {
    openModal?.(<LoginModal />);
  };

  const handleLogout = () => {
    // logout API 호출
    //api.post('logout').then((res) => {
    // })
    console.log('logout');
    localStorage.removeItem('refershToken');
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
                        setIsHidden(false);
                      }}
                      onMouseLeave={() => setSearchIsOpen(false)}
                      onClick={() => setSearchIsOpen(true)}
                    >
                      <MenuBtn>공고 검색</MenuBtn>
                      <SearchMenu searchIsOpen={searchIsOpen} isHidden={[isHidden, setIsHidden]} />
                    </NavMenu>
                    <NavMenu>
                      <MenuBtn> 제목 검색 </MenuBtn>
                      <SearchByText />
                    </NavMenu>
                    <GpsContainer
                      widthProp={NavMenuWidth.gps}
                      onMouseEnter={() => {
                        setGpsIsOpen(true);
                      }}
                      onMouseLeave={() => setGpsIsOpen(false)}
                      onClick={() => setGpsIsOpen(true)}
                    >
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
                  <UploadStudyLink to="/uploadStudy">공고 등록</UploadStudyLink>
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
