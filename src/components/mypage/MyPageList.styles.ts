import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';

interface isOpen {
  [key: string]: boolean;
}

interface isOn {
  [key: string]: boolean;
}

const MyPageBlock = styled.div`
  display: ${({ isOpen }: isOpen) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  margin: 0 auto;
  top: 4rem;
  cursor: default;
  box-shadow: 0px 4px 5px ${COLOR.GRAY_100};
  padding: 1rem;
  z-index: 9999;
  background-color: ${COLOR.WHITE};
  a {
    font-size: 16px;
    text-align: center;
    padding: 0 20px;
  }
  a + a {
    margin-top: 1rem;
  }
  a:hover {
    font-weight: bold;
  }
`;

export { MyPageBlock };
