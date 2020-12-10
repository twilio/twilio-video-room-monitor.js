import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTotalBandwidth } from '../../../hooks/useStats/useStats';

const apexOptions = {
  chart: {
    id: 'realtime',
    height: '100%',
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
    palette: 'palette2',
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
    text: 'Sent Bandwidth Chart',
    align: 'left',
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'numeric',
    range: 100,
  },
  legend: {
    show: false,
  },
};

export default function SentBandwidthChart() {
  const totalBandwidth = useTotalBandwidth('bytesSent');
  const [bandwidthArr, setBandwidthArr] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setBandwidthArr((prev) => [...prev, { x: performance.now() / 1000, y: totalBandwidth || 0 }]);
  }, [totalBandwidth]);

  return (
    <div>
      <ReactApexChart
        options={apexOptions}
        series={[{ name: 'sent bandwidth', data: bandwidthArr }]}
        type="line"
        height={350}
      />
    </div>
  );
}
