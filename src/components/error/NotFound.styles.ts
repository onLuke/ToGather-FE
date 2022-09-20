import styled from '@emotion/styled';

const NotFoundBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 10rem;
    padding-top: 5rem;
    font-weight: normal;
  }

  .subscription {
    font-size: 2rem;
    padding-top: 2rem;

    p + p {
      padding-top: 5px;
    }
  }

  .buttonBlock {
    padding-top: 1rem;
    button {
      width: 15%;
      height: 40px;
      background: none;
      border: 2px solid black;
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

export { NotFoundBlock };
