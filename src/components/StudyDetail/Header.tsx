import { Title, AuthorBlock, WrapAuthor, AuthorImg, Author, DateBox } from './Header.style';

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
          <DateBox>{gettedData.deadLine}</DateBox>
        </WrapAuthor>
      </AuthorBlock>
    </>
  );
};

export default Header;
