import React from 'react';
import {
  Title,
  UserConfirmButtonContainer,
  UserIntoProjectBlock,
  UserListContainer,
  UserProfileContainer,
} from './UserIntoProject.styles';

interface IProps {
  userInfo: any;
  projectId: string;
  confirmProjectId: string;
  handleEnterUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRefuseUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserIntoProject = ({
  userInfo,
  projectId,
  confirmProjectId,
  handleEnterUser,
  handleRefuseUser,
}: IProps) => {
  if (userInfo.length === 0) {
    return <div></div>;
  }
  return (
    <UserIntoProjectBlock>
      <Title>요청인원</Title>
      <UserListContainer>
        {confirmProjectId == projectId ? (
          userInfo.map((user: any) => (
            <UserProfileContainer key={user.memberId}>
              <div className="profileImage">
                <img src={user.profileImage} alt="프로필" />
              </div>
              <p className="nickname">{user.nickname}</p>
              <p className="techStack">{user.techStacks.map((item: any) => item.name)}</p>
              <UserConfirmButtonContainer>
                <button
                  data-userId={user.memberId}
                  data-projectId={projectId}
                  className="confirm"
                  onClick={handleEnterUser}
                >
                  승인
                </button>
                <button
                  data-userId={user.memberId}
                  data-projectId={projectId}
                  className="refuse"
                  onClick={handleRefuseUser}
                >
                  거절
                </button>
              </UserConfirmButtonContainer>
            </UserProfileContainer>
          ))
        ) : (
          <></>
        )}
      </UserListContainer>
    </UserIntoProjectBlock>
  );
};

export default UserIntoProject;
