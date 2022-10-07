import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { BarGraph, BtnLeft, BtnRight } from './Graph.style';
import { getStatistics } from 'src/apis/Statistics';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import COLOR from 'src/constants/colors';
import { selector } from 'recoil';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

ChartJS.register(...registerables);

const Graph = () => {
  const nextWeekRef = useRef<number | null>(null);
  const [page, setPage] = useState(0);

  const fetchLists = async (pageParam: number | '') => {
    const res = await getStatistics(pageParam);
    const { data } = res;
    const isLast = res.data.length === 0 ? true : false;
    if (nextWeekRef.current === null) nextWeekRef.current = data.weeks;
    return {
      data,
    };
  };

  const { data, status } = useQuery(
    ['statistics', page],
    async () => {
      let data;
      if (nextWeekRef.current !== null) data = await fetchLists(nextWeekRef.current - page);
      else data = await fetchLists('');
      return data.data;
    },
    {
      select: (data) => {
        return [
          ...data.techStatistics.sort((a: any, b: any) => {
            return b.count - a.count;
          }),
        ];
      },
      staleTime: Infinity,
    }
  );

  let dataLabel = [];
  let dataNum = [];
  const colors = [COLOR.BLUR_100, COLOR.GRAY_200, COLOR.LOGO_COLOR, COLOR.RED_100, 'yellow'];

  if (data) {
    for (let i = 0; i < 5 && i < data.length; i++) {
      dataNum.push(data[i].count);
      dataLabel.push(data[i].techStackName);
    }
  }

  let rankColor = [
    '#11b288',
    '#207ac7',
    '#207ac7',
    '#207ac7',
    '#d6d6d6',
    '#d6d6d6',
    '#d6d6d6',
    '#d6d6d6',
  ];

  const stasisticsData = {
    labels: dataLabel,
    datasets: [
      {
        backgroundColor: rankColor,
        borderColor: rankColor,
        borderWidth: 1,
        hoverBackgroundColor: rankColor,
        hoverBorderColor: rankColor,
        data: dataNum,
        barThickness: 35,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      labels: {
        font: {
          size: 20,
          family: 'Jua',
          lineHeight: 1.2,
        },
      },
      title: {
        display: true,
        text:
          page === 0
            ? '이번주 가장 많이 사용된 기술 통계'
            : `${page}주 전 가장 많이 사용된 기술 통계`,
        style: { fontSize: 20 },
        font: {
          size: 20,
          family: 'Jua',
        },
      },
      Transitions: {
        active: 0,
        resize: 0,
      },
    },
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const handleNext = () => {
    setPage(page - 1);
  };
  const handlePrev = () => {
    setPage(page + 1);
  };

  return (
    <>
      <BarGraph data={stasisticsData} width={300} height={200} options={options}></BarGraph>
      {page !== 0 && <BtnLeft onClick={handleNext}>다음 주</BtnLeft>}
      <BtnRight onClick={handlePrev}>이전 주</BtnRight>
    </>
  );
};

export default Graph;
