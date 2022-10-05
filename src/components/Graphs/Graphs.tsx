import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { ChartBlock, LineGraph, BtnLeft, BtnRight } from './Graph.style';
import { getStatistics } from 'src/apis/Statistics';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import COLOR from 'src/constants/colors';

ChartJS.register(...registerables);

/* 
const DATA_COUNT = 4;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

const labels = ['이번주', '저번주', '2주전', '3주전'];
const data = {
  labels: labels,
  datasets: [
    {
      label: '사용 기술 스택 통계',
      data: [33, 53, 85, 41, 44, 65],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '사용 기술 스택 통계',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  },
}; */

/* const actions = [
  {
    name: 'Randomize',
    handler(chart:any) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = Utils.numbers({ count: chart.data.labels.length, min: -100, max: 100 });
      });
      chart.update();
    },
  },
]; */

const Graph = () => {
  /* const currentWeek = useRef(null);

  const { isLoading, error, data, isFetching } = useQuery(
    ['statistics'],
    async () => {
      const data1 = await getStatistics('');
      let week = data1.data.weeks;
      const data2 = await getStatistics(week - 1);
      const data3 = await getStatistics(week - 2);
      const data4 = await getStatistics(week - 3);

      const data = [
        ...data1.data.techStatistics,
        ...data2.data.techStatistics,
        ...data3.data.techStatistics,
        ...data4.data.techStatistics,
      ];

      
      console.log(currentWeek.current);

      return data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: new Date().getHours() === 0 ? 0 : Infinity,
      onSuccess: (data) => {},
      onError: (e: Error) => {},
    }
  ); */

  const currentWeek = useRef(0);
  const [page, setPage] = useState(0);

  const fetchLists = async (pageParam: number | '') => {
    const res = await getStatistics(pageParam);
    const { data } = res;
    const isLast = res.data.length === 0 ? true : false;
    return {
      data,
      nextPage: data.weeks - 1,
      prevPage: data.weeks + currentWeek.current,
      isLast: data.techStatistics.weeks - 1 === 0,
    };
  };

  let { data, status, fetchNextPage, isFetchingNextPage, fetchPreviousPage } = useInfiniteQuery(
    ['statistics'],
    ({ pageParam = '' }) => fetchLists(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return !lastPage.isLast ? lastPage.data.weeks - 1 : undefined;
      },
      getPreviousPageParam: (lastPage, allPage) => {
        return lastPage.prevPage;
      },
      staleTime: new Date().getHours() === 0 ? 0 : 0,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );
  const lastData = data?.pages[data?.pages.length - 1].data.techStatistics;

  let dataLabel = [];
  let dataNum = [];
  let dataSet = [];
  const colors = [COLOR.BLUR_100, COLOR.GRAY_200, COLOR.LOGO_COLOR, COLOR.RED_100, 'yellow'];
  if (lastData) {
    lastData.sort((a: any, b: any) => b.count - a.count);
    for (let i = 0; i < 5 && i < lastData.length; i++) {
      dataNum.push(lastData[i].count);
    }

    for (let i = 0; i < 5 && i < lastData.length; i++) {
      const name = lastData[i].techStackName;
      const count = lastData[i].count;

      dataSet.push({
        label: name,
        data: [count],
        backgroundColor: colors[i],
        borderColor: colors[i],
      });

      dataLabel.push(name);
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
      },
    ],
    options: {
      legend: { display: false },
    },
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    indexAxis: 'y',
  };

  const handleNext = () => {
    currentWeek.current--;
    fetchPreviousPage();
  };
  const handlePrev = () => {
    fetchNextPage();
    currentWeek.current++;
  };

  return (
    <ChartBlock>
      <LineGraph data={stasisticsData} width={300} height={200} options={options}></LineGraph>
      {/*       {currentWeek.current !== 0 && <BtnLeft onClick={handleNext}>다음 주</BtnLeft>}
      <BtnRight onClick={handlePrev}>이전 주</BtnRight> */}
    </ChartBlock>
  );
};

export default Graph;
