import React from 'react';
import { Background, LoadingText } from './LoadingAtMain.style';
import Loading__Spinner from '../../assets/Loading__Spinner.gif';

const LoadingAtMain = () => {
  return (
    <Background>
      <img src={Loading__Spinner} alt="로딩중" width="200px" />
    </Background>
  );
};

export default LoadingAtMain;
