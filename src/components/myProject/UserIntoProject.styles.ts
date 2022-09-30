import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const UserIntoProjectBlock = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 1rem;
`;

const UserListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const UserProfileContainer = styled.div`
  width: 200px;
  text-align: center;
  .profileImage {
    width: 100px;
    height: 100px;
    border: 1px solid;
    border-radius: 50%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .nickname {
    margin-top: 0.5rem;
  }

  .techStack {
    margin-top: 0.5rem;
  }
`;

const UserConfirmButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 0.5rem;
  button {
    width: 60px;
    color: white;

    &:hover {
      opacity: 0.6;
    }
  }
  .confirm {
    background-color: ${COLOR.BLUR_700};
  }

  .refuse {
    background-color: ${COLOR.RED_100};
  }
`;

export {
  UserIntoProjectBlock,
  Title,
  UserListContainer,
  UserProfileContainer,
  UserConfirmButtonContainer,
};
