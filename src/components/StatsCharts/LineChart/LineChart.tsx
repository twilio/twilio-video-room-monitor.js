import React from 'react';
import { chartDatum } from '../../../types';
import { curveMonotoneX } from '@visx/curve';
import Headline from '../../typography/shared/Headline/Headline';
import { MAX_STAT_HISTORY_LENGTH, UPDATE_INTERVAL } from '../../../constants';
import { min, max } from 'd3-array';
import { XYChart, Axis, LineSeries, Grid, buildChartTheme } from '@visx/xychart';

export function formatBitrate(bytes: number, suffixIndex = 0): string {
  const suffixes = ['K', 'M', 'G'];
  if (bytes < 1000) return +bytes.toFixed(suffixIndex) + ' ' + suffixes[suffixIndex];
  return formatBitrate(bytes / 1000, suffixIndex + 1);
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
}

export default function LineChart({ data, title, yAxisLabel }: LineChartProps) {
  const minTime = Date.now() - UPDATE_INTERVAL * MAX_STAT_HISTORY_LENGTH + 1000;
  const xDomainMin = Math.min(min(data, (d) => d.x) ?? 0, minTime);

  return (
    <>
      <Headline>{title}</Headline>
      <XYChart
        height={275}
        width={465}
        xScale={{
          type: 'time',
          domain: [xDomainMin, max(data, (d) => d.x) ?? 0],
        }}
        yScale={{
          type: 'linear',
          domain: [0, Math.max(50, max(data, (d) => d.y)!)],
        }}
        margin={{ top: 10, left: 65, right: 0, bottom: 50 }}
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
          labelOffset={36}
        />
        <LineSeries dataKey="x" data={data} xAccessor={(d) => d.x} yAccessor={(d) => d.y} curve={curveMonotoneX} />
      </XYChart>
    </>
  );
}
