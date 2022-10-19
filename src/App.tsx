import React from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import MainPage from './pages/MainPage';
import ModalProvider from './contexts/ModalContext';
import AuthRedirectPage from './pages/AuthRedirectPage';
import ChatRoomPage from './pages/ChatRoomPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import HeaderNavigation from './components/Header/HeaderNavigation';
import UploadStudy from './pages/UploadStudy';
import StudyDetail from './pages/StudyDetail';
import MyProjectPage from './pages/MyProjectPage';
import ChatPage from './pages/ChatPage';
import { toast, ToastContainer } from 'react-toastify';
import './utils/firebase';
import { onMessageListener, requestFirebaseToken } from './utils/firebase';
import { useRecoilValue } from 'recoil';
import { userAtom } from './contexts/UserAtom';
import NotificationAlert from './components/Notification/NotificationAlert';

const App = () => {
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (user.nickname) {
      requestFirebaseToken();
      onMessageListener()
        .then((payload: any) => {
          toast.info(
            <NotificationAlert
              body={payload.notification.body}
              title={payload.notification.title}
            />
          );
          console.log(payload);
        })
        .catch((err) => console.log('failed: ', err));
    }
  }, [user.nickname]);
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ModalProvider>
          <HeaderNavigation />
          <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={2000} theme={'colored'} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/myProject" element={<MyProjectPage />} />
            <Route path="/chatRoom" element={<ChatRoomPage />} />
            <Route path="/chat/:projectId/:roomId" element={<ChatPage />} />
            <Route path="/oauth/:social" element={<AuthRedirectPage />} />
            <Route path="/uploadStudy" element={<UploadStudy />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/studyDetail/:id" element={<StudyDetail />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default App;
