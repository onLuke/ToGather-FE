import React, { useEffect, useState } from 'react';
import { editUser, withdrawal } from 'src/apis/user';
import CreatableSelect from 'react-select/creatable';
import { position, stacktech } from 'src/mocks/SelectTechs';
import { CancelButton, SubmitButton } from 'src/styles/Button';
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
import { ProfileBoxBlock, ProfileContainer, ProfileWrapper } from 'src/styles/Profile';
import S3UploadImage from 'src/hooks/useS3UploadImage';
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
  const [fileImage, setFileImage] = useState('');
  const { form, changeInput, multiSelectChange, idNameToMultiSelect } = useInput(user);
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setFileImage(`${import.meta.env.VITE_AWS_S3_URL}${user.profileImage}`);
  }, [user.profileImage]);

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
      <ProfileBoxBlock>
        <InputLabel htmlFor="profileImage">프로필</InputLabel>
        <ProfileContainer>
          <ProfileWrapper>
            {fileImage && (
              <img className="profile" src={fileImage} alt="프로필" style={{ margin: 'auto' }} />
            )}
          </ProfileWrapper>
          <label htmlFor="profileImage">업로드</label>
          <InputText id="profileImage" name="profileImage" type="file" onChange={handleImageView} />
        </ProfileContainer>
      </ProfileBoxBlock>
      <InputBoxBlock>
        <InputLabel htmlFor="nickname">닉네임</InputLabel>
        <InputText
          id="nickname"
          name="nickname"
          type="text"
          value={form.nickname || ''}
          onChange={changeInput}
        />
        <button>중복확인</button>
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
          options={stacktech}
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
