import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { signUp } from 'src/apis/auth';
import { authAtom, authSelector } from 'src/contexts/AuthAtom';
import { userSelector } from 'src/contexts/UserAtom';
import useInput from 'src/hooks/useInput';
import S3UploadImage from 'src/hooks/useS3UploadImage';
import { position, stacktech } from 'src/mocks/SelectTechs';
import { SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import {
  InputBoxBlock,
  Title,
  Wrapper,
  ButtonBlock,
  ProfileWrapper,
  ProfileBoxBlock,
  ProfileContainer,
} from './RegisterModal.styles';

const RegisterModal = () => {
  const [fileImage, setFileImage] = useState('');
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const setUser = useSetRecoilState(userSelector);
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const { form, changeInput, multiSelectChange } = useInput({
    profileImage: '',
    nickname: '',
    techStackDtos: [],
  });

  const handleImageView = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileImage(URL.createObjectURL(e.target.files[0]));
      handleFileInput(e);
    }
  };

  const handleImageUpload = async () => {
    try {
      const imageUrl = await handleUpload();
      signUp({ ...form, profileImage: imageUrl }, authToken.signUpToken)
        .then((res) => {
          const user = {
            id: res.data.id,
            nickname: res.data.nickname,
            profileImage: res.data.profileImage,
            techStackDtos: res.data.techStackDtos,
          };
          setAuthToken({ refreshToken: res.data.refreshToken });
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('이미지 업로드 오류');
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await handleImageUpload();

    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProfileBoxBlock>
        <InputLabel htmlFor="profileImage">프로필</InputLabel>
        <ProfileContainer>
          <ProfileWrapper>
            {fileImage && (
              <img className="profile" src={fileImage} alt="프로필" style={{ margin: 'auto' }} />
            )}
          </ProfileWrapper>
          <label htmlFor="profileImage">업로드</label>
          <InputText
            id="profileImage"
            name="profileImage"
            type="file"
            value={form.profileImage}
            onChange={handleImageView}
          />
        </ProfileContainer>
      </ProfileBoxBlock>
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
      {/* <InputBoxBlock>
          <InputLabel htmlFor="position">포지션</InputLabel>
          <Select
            className="customSelect"
            defaultValue={position[0]}
            id="position"
            name="position"
            placeholder="포지션"
            options={position}
            onChange={handleSelectChange}
          />
        </InputBoxBlock> */}
      <InputBoxBlock>
        <InputLabel htmlFor="techStackDtos">기술 태그</InputLabel>
        <CreatableSelect
          isClearable
          isMulti
          id="techStackDtos"
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
