import axios from 'axios';
import React, { useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userLogin } from 'src/apis/auth';
import { authAtom, authSelector } from 'src/contexts/AuthAtom';
import { userSelector } from 'src/contexts/UserAtom';
import useInput from 'src/hooks/useInput';
import { position, stacktech } from 'src/mocks/SelectTechs';
import { SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import { InputBoxBlock, Title, Wrapper, ButtonBlock } from './RegisterModal.styles';

const RegisterModal = () => {
  const [authToken, setAuthToken] = useRecoilState(authAtom);
  const setUser = useSetRecoilState(userSelector);
  const { form, changeInput, multiSelectChange } = useInput({
    profileImage: '',
    nickname: '',
    techStackDtos: [],
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const data = await userLogin(form, authToken.signUpToken)
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
