import { InfoBlock, Info, Content, ContentTitle, ContetnBlock } from './Info.style';

import React from 'react';

interface IProps {
  gettedData: any;
}
const InfoContainer = ({ gettedData }: IProps) => {
  return (
    <>
      <InfoBlock>
        <Info>
          <label htmlFor="">모집 상태</label>
          {gettedData.status === 'RECRUITING' ? '모집중' : '모집완료'}
        </Info>
        {gettedData.offline ? (
          <Info>
            <label htmlFor="">위치</label>
            {gettedData.location}
          </Info>
        ) : null}
        <Info>
          <label htmlFor="">온/오프라인</label>
          {gettedData.offline ? '오프라인' : '온라인'}
        </Info>
        <Info>
          <label htmlFor="">기술 스택</label>
          {gettedData.techStacks.map((item: any) => item.name).join(', ')}
        </Info>
      </InfoBlock>
      <ContetnBlock>
        <ContentTitle>프로젝트 내용</ContentTitle>
        <Content dangerouslySetInnerHTML={{ __html: gettedData.content }} />
      </ContetnBlock>
    </>
  );
};

export default InfoContainer;
