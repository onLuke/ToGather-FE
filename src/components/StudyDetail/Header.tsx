import { Title, AuthorBlock, WrapAuthor, AuthorImg, Author, DateBox } from './Header.style';

const Header = () => {
  return (
    <>
      <Title>제목 테스트 라인입니다 LoremLoremLoremLoremLoremLoremLoremLorem</Title>
      <AuthorBlock>
        <WrapAuthor>
          <AuthorImg src="/" />
          <Author>작성자</Author>
          <DateBox>{Date.now()}</DateBox>
        </WrapAuthor>
      </AuthorBlock>
    </>
  );
};

export default Header;
