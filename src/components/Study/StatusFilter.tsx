import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { StatusFilterAtom } from 'src/contexts/FilterOptionAtom';
import { WrapLabel, Label, HiddenInput, Circle } from './StatusFilter.style';

const StatusFilter = () => {
  const [isOn, setIsOn] = useState(true);
  const setStatus = useSetRecoilState(StatusFilterAtom);

  const handleLabel = (e: any) => {
    if (!isOn) setStatus('RECRUITING');
    else setStatus('COMPLETED');
    setIsOn(!isOn);
  };

  return (
    <WrapLabel>
      <Label isOn={isOn} htmlFor="status">
        <HiddenInput id="status" onClick={handleLabel}></HiddenInput>
        <Circle isOn={isOn}></Circle>
      </Label>
    </WrapLabel>
  );
};

export default StatusFilter;
