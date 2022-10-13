import styled from '@emotion/styled';

const LoadingBlock = styled.div`
  position: relative;
  height: 100vh;
  background: #ddd;
  opacity: 0.6;
  z-index: 9999;
`;

const LoadingPannel = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: flex-end;
  font-size: 80px;

  .circle {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: #1c58f2;
    margin-left: 10px;
  }

  .circle:nth-of-type(1) {
    animation: loading 1s 0.1s ease-in infinite;
  }
  .circle:nth-of-type(2) {
    animation: loading 1s 0.2s ease-in infinite;
  }
  .circle:nth-of-type(3) {
    animation: loading 1s 0.3s ease-in infinite;
  }

  @keyframes loading {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export { LoadingBlock, LoadingPannel };
