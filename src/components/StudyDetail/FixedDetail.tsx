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
import { getStudyDetailQuery } from '../../service/studyQuery';
import { ProjectDetailAtom } from '../../contexts/ProjectDetailAtom';
import { useRecoilValue } from 'recoil';

const FixedDetail = () => {
  return (
    <>
      <Post>
        <MemberTable>
          <WrapTableColumn>
            <TableAttribute>모집인원</TableAttribute>
            <TableValue>{/* {data.member.length}/{data.personnel} */}2/4</TableValue>
          </WrapTableColumn>
          <WrapTableColumn>
            <TableAttribute>팀장</TableAttribute>
            <TableValue>{/* {projectDetail.author} */}닉네임</TableValue>
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
