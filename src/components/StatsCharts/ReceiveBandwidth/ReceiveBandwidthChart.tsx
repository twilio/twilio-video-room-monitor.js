import React from 'react';
import LineChart from '../LineChart/LineChart';
import { useStats } from '../../../hooks/useStats/useStats';

export default function ReceiveBandwidthChart() {
  const { receivedBitrateHistory, currentReceivedBitrate } = useStats();

  return (
    <LineChart
      data={receivedBitrateHistory}
      yAxisLabel={'Bits per second'}
      title={`Total Bandwidth Received: ${currentReceivedBitrate?.toLocaleString()}kbps`}
    />
  );
}
