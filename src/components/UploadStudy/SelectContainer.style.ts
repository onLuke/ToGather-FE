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

const WrapSelects = styled.div`
  margin-top: 3rem;
  ${Flex({ justifyContent: 'space-around', alignItems: 'center' })}
  height:25%
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
  ${Flex({ columnGap: '3rem' })};
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
  color: transparent;
  :focus {
    outline: none;
  }
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

const WrapTechSelect = styled(WraponOffline)``;

export {
  WrapSelects,
  RestSelectBlock,
  WrapRegionSelect,
  RegionInput,
  WrapMapInput,
  OnOfflineBlock,
  WraponOffline,
  WrapTechSelect,
};
