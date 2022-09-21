import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

interface props {
  btnType: string;
  children: React.ReactNode;
}

const buttonStyle = css`
  width: 6rem;
  height: 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 4px;
  color: white;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  ${buttonStyle}
  margin-right: 1rem;
  background: ${COLOR.BLUR_700};
`;

const CancelButton = styled.button`
  ${buttonStyle}
  background: ${COLOR.RED_100};
`;

export { SubmitButton, CancelButton };
