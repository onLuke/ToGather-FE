import { Title, AuthorBlock, WrapAuthor, AuthorImg, Author, DateBox } from './Header.style';

interface iProps {
  gettedData: any;
}
const Header = ({ gettedData }: iProps) => {
  return (
    <>
      <Title>제목 테스트 라인입니다</Title>
      <AuthorBlock>
        <WrapAuthor>
          <AuthorImg src=/* {gettedData.image} */"/" />
          <Author>작성자</Author>
          <DateBox>{Date.now()}</DateBox>
        </WrapAuthor>
      </AuthorBlock>
    </>
  );
};

export default Header;
