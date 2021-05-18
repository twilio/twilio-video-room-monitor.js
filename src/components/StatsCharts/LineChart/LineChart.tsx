import React from 'react';
import { chartDatum } from '../../../types';
import { connectNulls } from '../../../utils/utils';
import Headline from '../../typography/Headline/Headline';
import { MAX_STAT_HISTORY_LENGTH, UPDATE_INTERVAL } from '../../../constants';
import { min, max } from 'd3-array';
import { XYChart, Axis, LineSeries, Grid, buildChartTheme } from '@visx/xychart';

export function formatBitrate(bytes: number, suffixIndex = 0): string {
  const suffixes = ['kbps', 'mbps', 'gbps'];
  if (bytes < 1000) return +bytes.toFixed(0) + ' ' + suffixes[suffixIndex];
  return formatBitrate(bytes / 1024, suffixIndex + 1);
}

const theme = buildChartTheme({
  backgroundColor: 'transparent',
  colors: ['#E22525'],
  tickLength: 2,
  gridColor: '#333',
  gridColorDark: '#333',
  svgLabelSmall: { strokeWidth: 0.2, stroke: '#ddd', fill: '#ddd' },
  svgLabelBig: { strokeWidth: 0, fill: '#ddd' },
});

interface LineChartProps {
  data: chartDatum[];
  title: string;
  yAxisLabel: string;
  hidden: boolean;
}

export default function LineChart({ data, title, yAxisLabel, hidden }: LineChartProps) {
  const minTime = Date.now() - UPDATE_INTERVAL * MAX_STAT_HISTORY_LENGTH;
  const filteredData = connectNulls(data.filter((d) => d.x >= minTime));

  const xDomainMin = Math.min(min(filteredData, (d) => d.x) ?? 0, minTime);

  if (hidden) return null;

  return (
    <>
      <Headline>{title}</Headline>
      <XYChart
        height={275}
        width={465}
        xScale={{
          type: 'time',
          domain: [xDomainMin, max(filteredData, (d) => d.x) ?? 0],
        }}
        yScale={{
          type: 'linear',
          domain: [0, Math.max(50, max(data, (d) => d.y)!)],
        }}
        margin={{ top: 10, left: 75, right: 0, bottom: 50 }}
        theme={theme}
      >
        <Grid columns={false} numTicks={5} strokeDasharray="2" />
        <Grid rows={false} strokeDasharray="2" />
        <Axis orientation="bottom" label="Time" />
        <Axis
          orientation="left"
          label={yAxisLabel}
          numTicks={5}
          tickFormat={(d) => formatBitrate(d)}
          labelOffset={48}
        />
        <LineSeries dataKey="x" data={filteredData} xAccessor={(d) => d.x} yAccessor={(d) => d.y} />
      </XYChart>
    </>
  );
}
