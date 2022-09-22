import React, { ReactElement } from 'react';
import { UploadPageMain, Heading } from './WrapSection.style';

const WrapSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UploadPageMain>
        <Heading>등록할 공고 정보를 선택해주세요</Heading>
        {children}
      </UploadPageMain>
    </>
  );
};

export default WrapSection;
