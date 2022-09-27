import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const InputBoxBlock = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  align-items: center;

  .customSelect {
    width: 60%;
  }
`;

const ProfileImageBlock = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
`;

const ProfileArticle = styled.article`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: gray;
`;

const InputLabel = styled.label`
  display: block;
  width: 15%;
`;

const InputText = styled.input`
  width: 60%;
  height: 100%;
  border-radius: 5px;
  border: ${({ type }: { type: string }) => (type === 'file' ? 'none' : '2px solid #d1d1d1')};
  padding: 0 1rem;
  &:focus {
    outline: none;
    border-color: ${COLOR.BLUR_700};
  }
`;

export { InputBoxBlock, InputLabel, InputText, ProfileImageBlock, ProfileArticle };
