import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundBlock } from './NotFound.styles';

const NotFound = () => {
  const navigate = useNavigate();
  const handleButtonToMain = () => {
    navigate('/');
  };
  return (
    <NotFoundBlock>
      <h1>404</h1>
      <div className="subscription">
        <p>찾을수 없는 페이지 입니다.</p>
        <p>잘못된 이동 경로입니다 : )</p>
      </div>
      <div className="buttonBlock">
        <button onClick={handleButtonToMain}>홈으로 이동</button>
      </div>
    </NotFoundBlock>
  );
};

export default NotFound;
