import React from 'react';
import useStats from '../../../hooks/useStats/useStats';
import LineChart from '../LineChart/LineChart';

export default function SentBandwidthChart() {
  const { sentBytesHistory } = useStats();

  return <LineChart data={sentBytesHistory} yAxisLabel={'Bytes Sent'} title="Total Bytes Sent (kbps)" />;
}
