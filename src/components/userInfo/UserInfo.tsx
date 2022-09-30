import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getUser } from 'src/apis/user';
import { userSelector } from 'src/contexts/UserAtom';
import UserService from 'src/service/UserService';
import Breadcrumb from '../breadCrumb/Breadcrumb';
import { UserInfoBlock } from './UserInfo.styles';
import UserInfoEdit from './UserInfoEdit';

const UserInfo = () => {
  const [user, setUser] = useRecoilState(userSelector);
  const navigate = useNavigate();
  const { updateUserByIdService } = UserService();

  const getUserById = async () => {
    if (!user.id) {
      alert('잘못된 접근입니다.');
      navigate('/');
      return;
    }
    const userId = user.id;

    await getUser(userId)

    getUser(userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <UserInfoBlock>
      <Breadcrumb>마이 페이지 - 내정보</Breadcrumb>
      <UserInfoEdit user={user} />
    </UserInfoBlock>
  );
};

export default UserInfo;
