import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';
ChartJS.register(...registerables);

const ChartBlock = styled.section`
  width: 800px;
  height: 30rem;
  cursor: default;
  position: relative;
  top: 7rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 3rem;
`;

const LineGraph = styled(Bar)`
  width: 100%;
  height: 10rem;
`;

const data = {
  labels: ['이번주', '저번주', '2주전', '3주전'],
  datasets: [
    {
      label: '사용 기술 스택 통계',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const BtnLeft = styled.button`
  width: 5rem;
  height: 2rem;
  position: absolute;
  left: 40%;
  z-index: 100;
`;

const BtnRight = styled.button`
  width: 5rem;
  height: 2rem;
  position: absolute;
  right: 40%;
  z-index: 100;
`;

export { ChartBlock, LineGraph, BtnLeft, BtnRight };
