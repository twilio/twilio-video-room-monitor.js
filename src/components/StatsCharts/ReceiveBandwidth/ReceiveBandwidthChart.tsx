import React from 'react';
import useStats from '../../../hooks/useStats/useStats';
import LineChart from '../LineChart/LineChart';

export default function ReceiveBandwidthChart({ hidden }: { hidden: boolean }) {
  const { receivedBytesHistory } = useStats();

  return (
    <LineChart
      data={receivedBytesHistory}
      yAxisLabel={'Bytes Received'}
      hidden={hidden}
      title="Total Bytes Received (kbps)"
    />
  );
}
