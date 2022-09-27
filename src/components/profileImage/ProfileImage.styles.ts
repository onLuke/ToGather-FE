import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const ProfileWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 3px 3px 10px rgb(0, 0, 0, 0.4);
  .profile {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  label {
    display: inline-block;
    height: 100%;
    margin: 1rem 0;
    padding: 0.5em 0.75em;
    color: white;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: ${COLOR.BLUR_700};
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;

    &:hover {
      opacity: 0.8;
    }
  }

  input[type='file'] {
    /* 파일 필드 숨기기 */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export { ProfileWrapper, ProfileContainer };
