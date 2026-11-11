import { render } from '@testing-library/react';
import * as constants from '../../../constants';
import LineChart, { formatBitrate } from './LineChart';
import { XYChart } from '@visx/xychart';

// Record the props passed to XYChart while still rendering the real chart.
jest.mock('@visx/xychart', () => {
  const actual = jest.requireActual('@visx/xychart');
  return { ...actual, XYChart: jest.fn((props: any) => <actual.XYChart {...props} />) };
});
const mockXYChart = XYChart as unknown as jest.Mock;
const xyChartProps = () => mockXYChart.mock.calls[mockXYChart.mock.calls.length - 1][0];

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

describe('the LineChart component', () => {
  it('should render the title, axis labels, and a line for the data', () => {
    const { container, getByText } = render(
      <LineChart
        title="Test Chart"
        yAxisLabel="Y Axis"
        data={[
          { x: 1400, y: 10 },
          { x: 2000, y: 20 },
        ]}
      />
    );
    expect(getByText('Test Chart')).toBeInTheDocument();
    expect(getByText('Time')).toBeInTheDocument();
    expect(getByText('Y Axis')).toBeInTheDocument();
    expect(container.querySelector('svg path[d]')?.getAttribute('d')).toMatch(/^M[\d.]+,[\d.]+L/);
  });

  it('it should correctly set the xScale when the largest x value is greater than xDomainMin', () => {
    render(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 2000, y: 10 }]} />);
    expect(xyChartProps().xScale).toEqual({ domain: [1500, 2000], type: 'time' });
  });

  it('it should correctly set the xScale when the largest x value is less than xDomainMin', () => {
    render(
      <LineChart
        title="Test Chart"
        yAxisLabel="Y Axis"
        data={[
          { x: 1400, y: 10 },
          { x: 2000, y: 10 },
        ]}
      />
    );
    expect(xyChartProps().xScale).toEqual({ domain: [1400, 2000], type: 'time' });
  });

  it('it should correctly set the yScale when the largest y value is less than 50', () => {
    render(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 2000, y: 0 }]} />);
    expect(xyChartProps().yScale).toEqual({ domain: [0, 50], type: 'linear' });
  });

  it('it should correctly set the yScale when the largest y value is greater than 50', () => {
    render(<LineChart title="Test Chart" yAxisLabel="Y Axis" data={[{ x: 1400, y: 10000 }]} />);
    expect(xyChartProps().yScale).toEqual({ domain: [0, 10000], type: 'linear' });
  });
});
