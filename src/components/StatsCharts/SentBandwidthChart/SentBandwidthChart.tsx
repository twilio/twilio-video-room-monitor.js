import React from 'react';
import LineChart from '../LineChart/LineChart';
import useStats from '../../../hooks/useStats/useStats';

export default function SentBandwidthChart() {
  const { sentBitrateHistory, currentSentBitrate } = useStats();

  return (
    <LineChart
      data={sentBitrateHistory}
      yAxisLabel={'Bits per second'}
      title={`Total Bandwidth Sent: ${currentSentBitrate?.toLocaleString()}kbps`}
    />
  );
}
