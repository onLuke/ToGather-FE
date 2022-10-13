import {
  Title,
  AuthorBlock,
  WrapAuthor,
  AuthorImg,
  Author,
  DateBox,
  RecruitingBtn,
} from './Header.style';

interface IProps {
  gettedData: any;
}
const Header = ({ gettedData }: IProps) => {
  return (
    <>
      <Title>{gettedData.title}</Title>
      <AuthorBlock>
        <WrapAuthor>
          <AuthorImg src={gettedData.member.profileImage} />
          <Author>{gettedData.member.nickname}</Author>
          <DateBox>{gettedData.deadline}</DateBox>
        </WrapAuthor>
        <RecruitingBtn className="모집버튼">
          {gettedData.status === 'RECRUITING' ? '모집진행중!' : '모집마감'}
        </RecruitingBtn>
      </AuthorBlock>
    </>
  );
};

export default Header;
