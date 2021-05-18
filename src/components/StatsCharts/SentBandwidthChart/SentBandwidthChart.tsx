import React from 'react';
import LineChart from '../LineChart/LineChart';
import { useStats } from '../../../hooks/useStats/useStats';

export default function SentBandwidthChart() {
  const { sentBitrateHistory } = useStats();

  return <LineChart data={sentBitrateHistory} yAxisLabel={'Bytes Sent'} title="Total Bytes Sent (kbps)" />;
}
