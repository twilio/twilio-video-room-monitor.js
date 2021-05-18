import React from 'react';
import { min, max } from 'd3-array';
import { MAX_STAT_HISTORY_LENGTH, UPDATE_INTERVAL } from '../../../constants';
import { XYChart, Axis, LineSeries, Grid } from '@visx/xychart';
import { connectNulls } from '../../../utils/utils';
import { datum } from '../../../types';
import styled from 'styled-components';

const ChartContainer = styled.div`
  margin: 10px;
  height: 200px;
`;

const Title = styled.h5``;

interface LineChartProps {
  data: datum[];
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
    <ChartContainer>
      <Title>{title}</Title>
      <XYChart
        height={250}
        width={450}
        xScale={{
          type: 'time',
          domain: [xDomainMin, max(filteredData, (d) => d.x) ?? 0],
        }}
        yScale={{
          type: 'linear',
          domain: [0, Math.max(50, max(data, (d) => d.y)!)],
        }}
      >
        <Grid columns={false} numTicks={5} strokeDasharray="2" />
        <Grid rows={false} strokeDasharray="2" />
        <Axis orientation="bottom" label="Time" />
        <Axis orientation="left" label={yAxisLabel} numTicks={5} />
        <LineSeries dataKey="x" data={filteredData} xAccessor={(d) => d.x} yAccessor={(d) => d.y} />
      </XYChart>
    </ChartContainer>
  );
}
