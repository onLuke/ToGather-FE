import React from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ModalProvider from './contexts/ModalContext';
import AuthRedirectPage from './pages/AuthRedirectPage';
import ChatPage from './pages/ChatPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import HeaderNavigation from './components/Header/HeaderNavigation';
import { useRecoilState } from 'recoil';
import { userAtom } from './contexts/UserAtom';
import UploadStudy from './pages/UploadStudy';

const App = () => {
  const [user, setUser] = useRecoilState(userAtom);
  function loadUser() {
    try {
      const localUser = localStorage.getItem('user');
      if (!localUser) return;
      setUser(JSON.parse(localUser));
    } catch (e) {
      console.log('localStorage is not working');
    }
  }
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <BrowserRouter>
      <ModalProvider>
        <HeaderNavigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/oauth/:social" element={<AuthRedirectPage />} />
          <Route path="/uploadStudy" element={<UploadStudy />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default App;
