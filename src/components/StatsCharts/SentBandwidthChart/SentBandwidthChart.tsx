import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { useTotalBandwidth } from '../../../hooks/useStats/useStats';

const ChartContainer = styled.div`
  margin: 10px;
  height: 250px;
`;

const apexOptions = {
  chart: {
    background: 'transparent',
    id: 'sentBandwidth',
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
    text: 'Total Bytes Sent (kbps)',
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
  yaxis: { min: 0, max: 1000 },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
};

export default function SentBandwidthChart() {
  const totalBandwidth = useTotalBandwidth('bytesSent');
  const [bandwidthArr, setBandwidthArr] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setBandwidthArr(function (prev) {
      let y = 0;
      if (totalBandwidth === null || totalBandwidth < 0) {
        y = prev[prev.length - 1]?.y || 0;
      } else {
        y = totalBandwidth;
      }
      return [...prev, { x: Date.now() / 1000, y: y }];
    });
  }, [totalBandwidth]);

  return (
    <ChartContainer>
      <ReactApexChart
        options={apexOptions}
        series={[{ name: 'Bytes Sent (kbps)', data: bandwidthArr }]}
        type="line"
        height="100%"
      />
    </ChartContainer>
  );
}
