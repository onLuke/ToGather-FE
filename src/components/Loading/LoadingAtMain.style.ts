import styled from '@emotion/styled';

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffffb7;
  z-index: 9999;

  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 18px;
  text-align: center;
`;
