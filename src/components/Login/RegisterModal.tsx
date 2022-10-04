import React, { useState } from 'react';
import Select from 'react-select';
import axios, { HeadersDefaults } from 'axios';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signUp } from 'src/apis/auth';
import { authAtom, authSelector } from 'src/contexts/AuthAtom';
import { userSelector } from 'src/contexts/UserAtom';
import { stacktech } from 'src/mocks/SelectTechs';
import { CustomButton, SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import { ProfileBoxBlock, ProfileContainer, ProfileWrapper } from 'src/styles/Profile';
import { InputBoxBlock, Title, Wrapper, ButtonBlock } from './RegisterModal.styles';
import useInput from 'src/hooks/useInput';
import S3UploadImage from 'src/hooks/useS3UploadImage';
import AuthService from 'src/service/AuthService';
import Api from 'src/apis/Api';
import ProfileImage from '../profileImage/ProfileImage';
import { checkNickname } from 'src/apis/user';

const baseImageURL = `${import.meta.env.VITE_AWS_S3_URL}/profile/default.png`;

const RegisterModal = () => {
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const { form, changeInput, multiSelectChange, idNameToMultiSelect } = useInput({
    profileImage: baseImageURL,
    nickname: '',
    techStackDtos: [],
  });
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const { registerService } = AuthService();

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileInput(e);
    changeInput(e);
  };

  const handleCheckUserNickName = async (e: React.MouseEvent<HTMLElement>) => {
    const nickname = form.nickname;
    try {
      const response = await checkNickname(nickname);

      alert(response.data ? '중복입니다' : '정상입니다.');

      setNicknameCheck(response.data);
    } catch (e) {}
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (nicknameCheck) {
      alert('중복확인을 눌러 주세요.');
      return;
    }
    try {
      const formData = { ...form };
      if (form.profileImage !== baseImageURL) {
        formData.profileImage = await handleUpload();
        formData.profileImage = `${import.meta.env.VITE_AWS_S3_URL}/${formData.profileImage}`;
      }
      formData.techStackDtos = idNameToMultiSelect(form.techStackDtos);
      const response = await registerService(formData);
    } catch (err) {
      console.error('전송 오류 form 데이터 확인');
    }

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProfileImage image={form.profileImage} uploadEvent={handleChangeProfileImage} />
      <InputBoxBlock>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <InputText
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname}
          onChange={changeInput}
        />
        <CustomButton style={{ marginLeft: '1rem' }} onClick={handleCheckUserNickName}>
          중복확인
        </CustomButton>
      </InputBoxBlock>
      <InputBoxBlock>
        <InputLabel htmlFor="techStackDtos">기술 태그</InputLabel>
        <Select
          isClearable
          isMulti
          id="techStackDtos"
          value={form.techStackDtos}
          className="customSelect"
          name="techStackDtos"
          placeholder="기술 태그"
          options={stacktech}
          onChange={multiSelectChange}
        />
      </InputBoxBlock>
      <ButtonBlock>
        <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
      </ButtonBlock>
    </Wrapper>
  );
};

export default RegisterModal;
