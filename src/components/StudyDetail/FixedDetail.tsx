import {
  Post,
  MemberTable,
  WrapTableColumn,
  TableAttribute,
  TableValue,
  BtnBlock,
  BackBtn,
  Btn,
} from './FixedDetail.style';
import React from 'react';

const FixedDetail = () => {
  return (
    <>
      <Post>
        <MemberTable>
          <WrapTableColumn>
            <TableAttribute>모집인원</TableAttribute>
            <TableValue>2/4</TableValue>
          </WrapTableColumn>
          <WrapTableColumn>
            <TableAttribute>팀장</TableAttribute>
            <TableValue>userName</TableValue>
          </WrapTableColumn>
        </MemberTable>
        <BtnBlock>
          <Btn>참여하기</Btn>
        </BtnBlock>
      </Post>
    </>
  );
};

export default FixedDetail;
