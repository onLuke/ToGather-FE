import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const EditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  font-size: 16px;
  color: ${COLOR.GRAY_800};
  background-color: transparent;
  margin-right: 2rem;
`;

export { EditContainer, Btn };
