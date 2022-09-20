import styled, { css } from '@emotion/styled';
import axios from 'axios';
import FontSizes from '../../constants/FontSizes';
import Flex from '../../styles/Flex';
import COLOR from '../../constants/colors';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarContainer from 'react-datepicker';

interface WrapMapProps {
  isOffline: boolean;
}

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

const WrapSelects = styled.div`
  margin-top: 3rem;
  ${Flex({ justifyContent: 'space-around', alignItems: 'center' })}
  min-height:30rem;
`;

const OnOfflineBlock = styled.div`
  ${Flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: '3rem',
  })}
  height:100%;
`;
const WrapRegionSelect = styled.div`
  ${Flex({ columnGap: '1rem' })};
  visibility: ${(props: WrapMapProps) => (props.isOffline ? 'hidden' : 'visible')};
  width: 25rem;
`;

const RegionInput = styled.input`
  background-color: hsl(0, 0%, 100%);
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  width: 75%;
  height: 38px;
  text-align: center;
  font-size: 16px;
`;

const WraponOffline = styled.div`
  width: 23rem;
`;

const WrapMapInput = styled.div``;

const RestSelectBlock = styled(OnOfflineBlock)`
  ${Flex({ flexDirection: 'column', alignItems: 'center' })};
  & > div {
    width: 23rem;
  }
  height: 100%;
`;

const CustomContainer = styled.div``;

export {
  UploadPageMain,
  Heading,
  WrapSelects,
  RestSelectBlock,
  WrapRegionSelect,
  RegionInput,
  WrapMapInput,
  OnOfflineBlock,
  WraponOffline,
  CustomContainer,
};
