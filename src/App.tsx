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
import UploadStudy from './pages/UploadStudy';

const App = () => {
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
