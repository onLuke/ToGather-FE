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

interface IProps {
  userId: string;
  gettedData: any;
  handleEnter: (e: React.MouseEvent<HTMLElement>) => void;
}

const TabletFixedDetail = ({ userId, gettedData, handleEnter }: IProps) => {
  return (
    <TabletPost>
      <TabletBlock>
        <TabletMember>
          <WrapTableColumn>
            <TableAttribute>모집인원</TableAttribute>
            <TableValue>{gettedData.personnel}</TableValue>
          </WrapTableColumn>
        </TabletMember>
        <TabletBtn onClick={handleEnter} disabled={userId === gettedData.member.id || !userId}>
          참여하기
        </TabletBtn>
      </TabletBlock>
    </TabletPost>
  );
};

export default TabletFixedDetail;
