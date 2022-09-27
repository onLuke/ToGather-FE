import React, { useState } from 'react';
import Select from 'react-select';
import axios, { HeadersDefaults } from 'axios';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signUp } from 'src/apis/auth';
import { authAtom, authSelector } from 'src/contexts/AuthAtom';
import { userSelector } from 'src/contexts/UserAtom';
import { stacktech } from 'src/mocks/SelectTechs';
import { SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import { ProfileBoxBlock, ProfileContainer, ProfileWrapper } from 'src/styles/Profile';
import { InputBoxBlock, Title, Wrapper, ButtonBlock } from './RegisterModal.styles';
import useInput from 'src/hooks/useInput';
import S3UploadImage from 'src/hooks/useS3UploadImage';
import AuthService from 'src/service/AuthService';
import Api from 'src/apis/Api';
import ProfileImage from '../profileImage/ProfileImage';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

const RegisterModal = () => {
  const [fileImage, setFileImage] = useState('');
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const { form, changeInput, multiSelectChange, idNameToMultiSelect } = useInput({
    profileImage: '',
    nickname: '',
    techStackDtos: [],
  });
  const { registerService } = AuthService();

  const handleImageView = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
      handleFileInput(e);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const imageUrl = await handleUpload();
      const formTechStack = idNameToMultiSelect(form.techStackDtos);

      const response = await registerService({
        ...form,
        profileImage: imageUrl,
        techStackDtos: formTechStack,
      });
    } catch (err) {
      console.error('전송 오류 form 데이터 확인');
    }

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProfileImage image={fileImage} uploadEvent={handleImageView} />
      <InputBoxBlock>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <InputText
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname}
          onChange={changeInput}
        />
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
