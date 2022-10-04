import React from 'react';
import { useRecoilState } from 'recoil';
import { editUser } from 'src/apis/user';
import { userAtom } from 'src/contexts/UserAtom';

const UserService = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const getUserByIdService = (id: number) => {};

  const updateUserByIdService = async (id: string, form: any) => {
    const response = await editUser(id, form);

    return response;
  };

  const deleteUserByIdService = (id: number) => {};
  return { getUserByIdService, updateUserByIdService, deleteUserByIdService };
};

export default UserService;
