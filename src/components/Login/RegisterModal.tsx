import axios from 'axios';
import React, { useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { authAtom, authSelector } from 'src/contexts/AuthAtom';
import useInput from 'src/hooks/useInput';
import { position, stacktech } from 'src/mocks/SelectTechs';
import { SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import { InputBoxBlock, Title, Wrapper, ButtonBlock } from './RegisterModal.styles';

const RegisterModal = () => {
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const { form, changeInput, multiSelectChange } = useInput({});

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(form);
    console.log(authToken);

    const data = axios
      .post(`https://dokuny.blog/oauth/signup`, form, {
        headers: {
          signUpToken: authToken.signUpToken,
        },
      })
      .then((data) => {
        console.log(data);
        setAuthToken(data.data);
      })
      .catch((err) => console.log(err));
    console.log(data);
    // data 안에 accessToken, refreshToken 들어 있다.
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
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
        <InputLabel htmlFor="profileImage">프로필</InputLabel>
        <InputText
          id="profileImage"
          name="profileImage"
          type="text"
          value={form.profileImage}
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
