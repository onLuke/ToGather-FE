import React, { useEffect, useState } from 'react';
import { withdrawal } from 'src/apis/user';
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
  const { form, changeInput, multiSelectChange } = useInput(user);
  const { handleFileInput, handleUpload } = S3UploadImage('profile/');
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();


const UserInfoEdit = ({ user }: { user: props }) => {
  const { form, setForm, changeInput, multiSelectChange } = useInput(user);
  const resetUser = useResetRecoilState(userAtom);
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(form);
  };

  const handleUserLeave = (e: React.MouseEvent<HTMLElement>) => {
    withdrawal(user.id)
      .then((res) => {
        localStorage.clear();
        resetUser();
        navigate('/');
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
          <InputText
            id="profileImage"
            name="profileImage"
            type="file"
            // value={form.profileImage}
            // onChange={handleImageView}
          />
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
