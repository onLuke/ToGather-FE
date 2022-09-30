import React from 'react';
import {
  Title,
  UserConfirmButtonContainer,
  UserIntoProjectBlock,
  UserListContainer,
  UserProfileContainer,
} from './UserIntoProject.styles';

const UserIntoProject = () => {
  return (
    <UserIntoProjectBlock>
      <Title>요청인원</Title>
      <UserListContainer>
        <UserProfileContainer>
          <div className="profileImage">프로필</div>
          <p className="nickname">toGahterKakaoEdit</p>
          <p className="techStack">기술 스택 </p>
          <UserConfirmButtonContainer>
            <button className="confirm">승인</button>
            <button className="refuse">거절</button>
          </UserConfirmButtonContainer>
        </UserProfileContainer>
      </UserListContainer>
    </UserIntoProjectBlock>
  );
};

export default UserIntoProject;
