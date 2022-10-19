import React, { useState } from 'react';
import Select from 'react-select';
import { CustomButton, SubmitButton } from 'src/styles/Button';
import { InputLabel, InputText } from 'src/styles/Input';
import { InputBoxBlock, Title, Wrapper, ButtonBlock } from './RegisterModal.styles';
import useInput from 'src/hooks/useInput';
import AuthService from 'src/service/AuthService';
import ProfileImage from '../profileImage/ProfileImage';
import { checkNickname } from 'src/apis/user';
import techTable from 'src/contexts/TechsTable';
import Api from 'src/apis/Api';
import { useRecoilState } from 'recoil';
import { imageAtom } from 'src/contexts/ImageAtom';
import { toast } from 'react-toastify';
import defaultImage from 'src/assets/images/images/default.png';

const RegisterModal = () => {
  const [imageFile, setImageFile] = useRecoilState(imageAtom);
  const { form, changeInput, multiSelectChange, idNameToMultiSelect } = useInput({
    profileImage: defaultImage,
    nickname: '',
    techStackDtos: [],
  });

  const [nicknameCheck, setNicknameCheck] = useState(true);
  const { registerService } = AuthService();

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      changeInput(e);
      setImageFile(e.target?.files[0]);
    }
  };

  const handleCheckUserNickName = async (e: React.MouseEvent<HTMLElement>) => {
    const nickname = form.nickname;
    if (!nickname) {
      toast.error('이름을 입력해주세요.');
      return;
    }
    try {
      const response = await checkNickname(nickname);

      const type = response.data ? 'error' : 'success';

      toast[type](response.data ? '중복입니다' : '정상입니다.');

      setNicknameCheck(response.data);
    } catch (e) {
      toast.error('다시 시도해 주세요.');
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (nicknameCheck) {
      toast.info('중복확인을 눌러 주세요.');
      return;
    }
    try {
      const formData = { ...form };
      const imgForm = new FormData();
      imgForm.append('file', imageFile);

      const file = await Api.post(`/image`, imgForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          if (res.data.status === 400) {
            throw new Error(res.data.errorMessage);
          }

          formData.techStackDtos = idNameToMultiSelect(form.techStackDtos);
          formData.profileImage = res.data;

          const response = registerService(formData).then((res) => {
            toast.success('회원가입 되었습니다.');
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
          });
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (err: any) {
      toast.error(err.message);
    }
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
          options={techTable}
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
