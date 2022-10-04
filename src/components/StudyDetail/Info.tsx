import { InfoBlock, Info, Content } from './Info.style';

import React from 'react';

interface IProps {
  gettedData: any;
}
const InfoContainer = ({ gettedData }: IProps) => {
  return (
    <>
      <InfoBlock>
        <Info>모집상태 : {gettedData.status === 'RECRUITING' ? '모집중' : '모집완료'}</Info>
        {gettedData.offline ? <Info>위치 : {gettedData.location}</Info> : null}
        <Info>온/오프라인 : {gettedData.offline ? '오프라인' : '온라인'}</Info>
        <Info>기술 스택 : {gettedData.techStacks.map((item: any) => item.name).join(', ')}</Info>
      </InfoBlock>
      <Content dangerouslySetInnerHTML={{ __html: gettedData.content }} />
    </>
  );
};

export default InfoContainer;
