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
import { useRecoilValue } from 'recoil';

interface IProps {
  userId: string;
  gettedData: any;
  handleEnter: (e: React.MouseEvent<HTMLElement>) => void;
}

const FixedDetail = ({ userId, gettedData, handleEnter }: IProps) => {
  return (
    <>
      <Post>
        <MemberTable>
          <WrapTableColumn>
            <TableAttribute>모집인원</TableAttribute>
            <TableValue>{gettedData.personnel}</TableValue>
          </WrapTableColumn>
          <WrapTableColumn>
            <TableAttribute>팀장</TableAttribute>
            <TableValue>{gettedData.member.nickname}</TableValue>
          </WrapTableColumn>
        </MemberTable>
        <BtnBlock>
          {}
          <Btn onClick={handleEnter} disabled={userId === gettedData.member.id || !userId}>
            참여하기
          </Btn>
        </BtnBlock>
      </Post>
    </>
  );
};

export default FixedDetail;
