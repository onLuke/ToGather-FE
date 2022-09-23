import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUser } from 'src/apis/user';
import { userSelector } from 'src/contexts/UserAtom';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { UserInfoBlock } from './UserInfo.styles';
import UserInfoEdit from './UserInfoEdit';

const UserInfo = () => {
  const [user, setUser] = useRecoilState(userSelector);
  const navigate = useNavigate();
  const checkUser = () => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const userId = user.id || JSON.parse(localUser).id;
      console.log(userId);
      getUser(userId)
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserInfoBlock>
      <Breadcrumb>마이 페이지 - 내정보</Breadcrumb>
      <UserInfoEdit user={user} />
    </UserInfoBlock>
  );
};

export default UserInfo;
