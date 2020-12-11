import React, { useEffect, useRef, useState } from 'react';
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
    id: 'realtime',
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  theme: {
    mode: 'dark',
    palette: 'palette10',
    monochrome: {
      enabled: false,
      color: '#FF9800',
      shadeTo: 'light',
      shadeIntensity: 0.65,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: 'Bytes Received (kbps)',
    align: 'left',
  },
  markers: {
    size: 0,
  },
  xaxis: {
    range: 50,
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
  legend: {
    show: false,
  },
};

export default function ReceiveBandwidthChart() {
  const totalBandwidth = useTotalBandwidth('bytesReceived');
  const [bandwidthArr, setBandwidthArr] = useState<{ x: number; y: number }[]>([]);

  const startTimeRef = useRef(Date.now() / 1000);

  useEffect(() => {
    setBandwidthArr(function (prev) {
      let y = 0;
      if (totalBandwidth === null || totalBandwidth < 0) {
        y = prev[prev.length - 1]?.y || 0;
      } else {
        y = totalBandwidth;
      }
      return [...prev, { x: Date.now() / 1000 - startTimeRef.current, y: y }];
    });
  }, [totalBandwidth]);

  return (
    <ChartContainer>
      <ReactApexChart
        options={apexOptions}
        series={[{ name: 'Bytes Received (kbps)', data: bandwidthArr }]}
        type="line"
        height="100%"
      />
    </ChartContainer>
  );
}
