import React from 'react';
import LineChart, { connectNulls, formatBitrate } from './LineChart';
import { shallow } from 'enzyme';
import * as constants from '../../../constants';
import { XYChart } from '@visx/xychart';

// @ts-ignore
constants.MAX_STAT_HISTORY_LENGTH = 5;

// @ts-ignore
constants.UPDATE_INTERVAL = 100;

Date.now = () => 1000;

describe('the formatBitrate function', () => {
  [
    { bytes: 789, result: '789 K' },
    { bytes: 10.5, result: '11 K' },
    { bytes: 1000, result: '1 M' },
    { bytes: 1250, result: '1.3 M' },
    { bytes: 55555, result: '55.6 M' },
    { bytes: 100000, result: '100 M' },
    { bytes: 999000, result: '999 M' },
    { bytes: 1000000, result: '1 G' },
    { bytes: 12570000, result: '12.57 G' },
  ].forEach((testCase) => {
    it(`should format ${testCase.bytes} to "${testCase.result}"`, () => {
      expect(formatBitrate(testCase.bytes)).toBe(testCase.result);
    });
  });
});

describe('the connectNulls function', () => {
  it('should overwrite y values that are null with the previous y value, if any', () => {
    const data = [
      { x: 10, y: null },
      { x: 20, y: 10 },
      { x: 30, y: null },
      { x: 40, y: 20 },
    ];

    const result = [
      { x: 10, y: null },
      { x: 20, y: 10 },
      { x: 30, y: 10 },
      { x: 40, y: 20 },
    ];

    expect(connectNulls(data)).toEqual(result);
  });
});

describe('the LineChart component', () => {
  it('it should correctly set the xScale when the largest x value is greater than xDomainMin', () => {
    const wrapper = shallow(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 2000, y: 10 }]} />);
    expect(wrapper.find(XYChart).prop('xScale')).toEqual({ domain: [1500, 2000], type: 'time' });
  });

  it('it should correctly set the xScale when the largest x value is less than xDomainMin', () => {
    const wrapper = shallow(
      <LineChart
        title="Test Chart"
        yAxisLabel="Y Axis"
        data={[
          { x: 1400, y: 10 },
          { x: 2000, y: 10 },
        ]}
      />
    );
    expect(wrapper.find(XYChart).prop('xScale')).toEqual({ domain: [1400, 2000], type: 'time' });
  });

  it('it should correctly set the yScale when the largest y value is less than 50', () => {
    const wrapper = shallow(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 2000, y: 0 }]} />);
    expect(wrapper.find(XYChart).prop('yScale')).toEqual({ domain: [0, 50], type: 'linear' });
  });

  it('it should correctly set the yScale when the largest y value is greater than 50', () => {
    const wrapper = shallow(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 1400, y: 10000 }]} />);
    expect(wrapper.find(XYChart).prop('yScale')).toEqual({ domain: [0, 10000], type: 'linear' });
  });
});
