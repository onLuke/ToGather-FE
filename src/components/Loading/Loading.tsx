import React from 'react';
import { LoadingBlock, LoadingPannel } from './Loading.styes';

const Loading = () => {
  return (
    <LoadingBlock>
      <LoadingPannel>
        Loading
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
      </LoadingPannel>
    </LoadingBlock>
  );
};

export default Loading;
