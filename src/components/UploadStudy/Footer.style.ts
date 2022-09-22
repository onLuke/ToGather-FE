import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

const FooterContainer = styled.footer`
  min-height: 5rem;
`;

const WrapSubmit = styled.div`
  margin: 1rem 0 1rem 80%;
  width: 5rem;
`;

const Submit = styled.button`
  border-radius: 10%;
  width: 4rem;
  height: 2rem;
  background-color: ${COLOR.BLUR_100};
`;

export { FooterContainer, WrapSubmit, Submit };
