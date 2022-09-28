import React from 'react';
import { TabletPost, TabletBlock, TabletMember, TabletBtn } from './TabletFixedDetail.style';
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

const TabletFixedDetail = () => {
  return (
    <TabletPost>
      <TabletBlock>
        <TabletMember>
          <WrapTableColumn>
            <TableAttribute>모집인원</TableAttribute>
            <TableValue>2/4</TableValue>
          </WrapTableColumn>
        </TabletMember>
        <TabletBtn>참여하기</TabletBtn>
      </TabletBlock>
    </TabletPost>
  );
};

export default TabletFixedDetail;
