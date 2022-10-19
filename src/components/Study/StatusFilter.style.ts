import styled from '@emotion/styled';
import COLOR from 'src/constants/colors';
import Flex from 'src/styles/Flex';

const WrapLabel = styled.div`
  ${Flex({ justifyContent: 'flex-end', alignItems: 'center' })};
  font-size: 20px;
`;
const Label = styled.label`
  margin-left: 1rem;
  justify-self: end;
  position: relative;
  display: inline-block;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  background-color: #c1cbd8;
  cursor: pointer;
  background-color: ${({ isOn }: { isOn: boolean }) => (isOn ? COLOR.LOGO_COLOR : '')};
  margin-right: 1.5rem;
`;
const HiddenInput = styled.input`
  position: absolute;
  left: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Circle = styled.div`
  transform: ${({ isOn }: { isOn: boolean }) => (!isOn ? 'translateX(24px)' : '')};
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.2s linear;
  background-color: #fff;
`;

export { WrapLabel, Label, HiddenInput, Circle };
