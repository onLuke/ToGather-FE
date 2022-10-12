import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';
ChartJS.register(...registerables);

const BarGraph = styled(Bar)`
  width: 100%;
  height: 10rem;
  margin-bottom: 2rem;
`;

const BtnLeft = styled.button`
  width: 5rem;
  height: 2rem;
  position: absolute;
  left: 42%;
`;

const BtnRight = styled.button`
  width: 5rem;
  height: 2rem;
  position: absolute;
  right: 42%;
`;

export { BarGraph, BtnLeft, BtnRight };
