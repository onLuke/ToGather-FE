import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import FontSizes from 'src/constants/FontSizes';

const UploadPageMain = styled.section`
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  padding: 60px 16px;
  width: 1024px;
  margin: 0 auto;
  color: #333;
  gap: 50px;
  position: relative;
  top: 4rem;
  height: 60rem;
`;

const Heading = styled.h2`
 font-size:${FontSizes.Study_Upload_Fontsize}
 font-weight:${FontSizes.Study_Upload_FontWeight}
 box-shadow: 2px 2px 2px ${COLOR.GRAY_100};
`;
export { UploadPageMain, Heading };
