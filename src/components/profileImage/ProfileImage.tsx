import React from 'react';
import { InputLabel, InputText } from 'src/styles/Input';
import { ProfileContainer, ProfileWrapper } from './ProfileImage.styles';

interface Iprops {
  image: string;
  uploadEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ image, uploadEvent }: Iprops) => {
  return (
    <>
      <ProfileContainer>
        <ProfileWrapper>
          {image && <img className="profile" src={image} alt="프로필" style={{ margin: 'auto' }} />}
        </ProfileWrapper>
        <label htmlFor="profileImage">프로필 선택</label>
        <InputText id="profileImage" name="profileImage" type="file" onChange={uploadEvent} />
      </ProfileContainer>
    </>
  );
};

export default ProfileImage;
