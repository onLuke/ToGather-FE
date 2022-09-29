import React, { useEffect, useState } from 'react';
import { editUser, withdrawal } from 'src/apis/user';
import CreatableSelect from 'react-select/creatable';
import { CancelButton, CustomButton, SubmitButton } from 'src/styles/Button';
import {
  ProfileImageBlock,
  InputBoxBlock,
  InputLabel,
  InputText,
  ProfileArticle,
} from 'src/styles/Input';
import { Wrapper, ButtonBlock } from './UserInfo.styles';
import useInput from 'src/hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { userAtom } from 'src/contexts/UserAtom';
import Select from 'react-select';
import S3UploadImage from 'src/hooks/useS3UploadImage';
import ProfileImage from '../profileImage/ProfileImage';
import techTable from 'src/contexts/TechsTable';

interface tech {
  value?: number;
  id?: number;
  name?: string;
  label?: string;
}

interface props {
  user: {
    id: string;
    profileImage: string;
    nickname: string;
    techStackDtos: tech[];
  };
}

const baseImageUrl = `${import.meta.env.VITE_AWS_S3_URL}/`;

const UserInfoEdit = ({ user }: props) => {
  const { form, changeInput, multiSelectChange, idNameToMultiSelect } = useInput({
    ...user
  });
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e);
    changeInput(e);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      let imageUrl = form.profileImage;
      if (user.profileImage !== form.profileImage) {
        imageUrl = await handleUpload();
        imageUrl = baseImageUrl + imageUrl;
      }

      const formTechStack = idNameToMultiSelect(form.techStackDtos);
      await editUser(user.id, {
        ...form,
        profileImage: imageUrl,
        techStackDtos: formTechStack,
      }).then((res) => {
        alert('성공');
        navigate('/');
      });
    } catch (e) {
      console.error(e);
    }
    console.log(form);
  };

  const handleUserLeave = (e: React.MouseEvent<HTMLElement>) => {
    withdrawal(user.id)
      .then((res) => {
        navigate('/');
        resetUser();
      })
      .catch((err) => console.log(err));
    console.log('회원탈퇴');
  };
  return (
    <Wrapper>
      <ProfileImage image={form.profileImage} uploadEvent={handleChangeProfileImage} />
      <InputBoxBlock>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <InputText
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname || ''}
          onChange={changeInput}
        />
        <CustomButton style={{ marginLeft: '1rem' }}>중복확인</CustomButton>
      </InputBoxBlock>
      <InputBoxBlock>
        <InputLabel htmlFor="tech">기술 태그</InputLabel>
        <Select
          isMulti
          value={form.techStackDtos}
          id="techStackDtos"
          className="customSelect"
          name="techStackDtos"
          placeholder="기술 태그"
          options={techTable}
          onChange={multiSelectChange}
        />
      </InputBoxBlock>
      <ButtonBlock>
        <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
        <CancelButton onClick={handleUserLeave}>회원탈퇴</CancelButton>
      </ButtonBlock>
    </Wrapper>
  );
};

export default UserInfoEdit;
