import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { getCpuPercent } from '../../../hooks/useCpuInfo/useCpuInfo';
import { useTotalBandwidth } from '../../../hooks/useStats/useStats';

const ChartContainer = styled.div`
  margin: 10px;
  height: 200px;
`;

const apexOptions = {
  chart: {
    background: 'transparent',
    id: 'receivedBandwidth',
    type: 'line',
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ['#f00'],
  theme: {
    mode: 'dark',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: 'CPU Usage (%)',
    align: 'left',
  },
  markers: {
    size: 0,
  },
  xaxis: {
    range: 75,
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: { min: 0, max: 100 },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
};

export default function CPUChart() {
  const cpuInfo = getCpuPercent();
  console.log(cpuInfo);
  const [cpuArr, setCPUArr] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setCPUArr(function (prev) {
      let y = 0;
      if (cpuInfo === null || cpuInfo < 0) {
        y = prev[prev.length - 1]?.y || 0;
      } else {
        y = cpuInfo;
      }
      return [...prev, { x: Date.now() / 1000, y: Math.round(y * 100) }];
    });
  }, [cpuInfo]);

  return (
    <ChartContainer>
      <ReactApexChart
        options={apexOptions}
        series={[{ name: 'CPU Usage (%)', data: cpuArr }]}
        type="line"
        height="100%"
      />
    </ChartContainer>
  );
}
