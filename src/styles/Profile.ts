import styled from '@emotion/styled';
import { InputBoxBlock } from './Input';

const ProfileBoxBlock = styled(InputBoxBlock)`
  height: 100%;
`;

const ProfileWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid;
  border-radius: 50px;
  .profile {
    width: 100%;
    height: 100%;
    border-radius: 50px;
    object-fit: cover;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-around;
  label {
    display: inline-block;
    height: 100%;
    padding: 0.5em 0.75em;
    color: white;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #337ab7;
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

export { ProfileBoxBlock, ProfileWrapper, ProfileContainer };
