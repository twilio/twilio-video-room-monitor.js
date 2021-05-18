import React from 'react';
import LineChart from '../LineChart/LineChart';
import { useStats } from '../../../hooks/useStats/useStats';

export default function ReceiveBandwidthChart() {
  const { receivedBitrateHistory } = useStats();

  return <LineChart data={receivedBitrateHistory} yAxisLabel={'Bytes Received'} title="Total Bytes Received (kbps)" />;
}
