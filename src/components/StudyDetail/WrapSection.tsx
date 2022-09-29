import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import { DetailBlock } from './WrapSection.style';

const WrapSection = ({ children }: { children: React.ReactNode }) => {
  return <DetailBlock>{children}</DetailBlock>;
};

export default WrapSection;
