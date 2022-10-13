import React, { useEffect, useState } from 'react';
import { checkNickname, editUser, withdrawal } from 'src/apis/user';
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
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userAtom } from 'src/contexts/UserAtom';
import Select from 'react-select';
import S3UploadImage from 'src/hooks/useS3UploadImage';
import ProfileImage from '../profileImage/ProfileImage';
import techTable from 'src/contexts/TechsTable';
import UserService from 'src/service/UserService';
import { toast } from 'react-toastify';
import { imageAtom } from 'src/contexts/ImageAtom';
import Api from 'src/apis/Api';

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

const UserInfoEdit = ({ user }: props) => {
  const [imageFile, setImageFile] = useRecoilState(imageAtom);
  const { form, changeInput, multiSelectChange, idLabelToMultiSel1ect } = useInput({
    ...user,
  });
  const resetUser = useResetRecoilState(userAtom);
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const navigate = useNavigate();
  const { updateUserByIdService } = UserService();

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

      toast.info(response.data ? '중복입니다' : '정상입니다.');

      setNicknameCheck(response.data);
    } catch (e) {}
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (user.nickname !== form.nickname && nicknameCheck) {
      toast.info('중복확인을 눌러 주세요.');
      return;
    }

    try {
      let imageUrl = form.profileImage;
      const imgForm = new FormData();
      imgForm.append('file', imageFile);

      const file = await Api.post(`/image`, imgForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const formTechStack = idLabelToMultiSel1ect(form.techStackDtos);
      const formData = { ...form, profileImage: imageUrl, techStackDtos: formTechStack };

      const response = await updateUserByIdService(user.id, formData);

      toast.success('회원정보 수정 성공');
      navigate('/');
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
        <CustomButton style={{ marginLeft: '1rem' }} onClick={handleCheckUserNickName}>
          중복확인
        </CustomButton>
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
