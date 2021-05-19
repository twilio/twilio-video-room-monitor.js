import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import RoomStatsProvider, { truncateFront } from './RoomStatsProvider';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';
import * as statsHooks from '../../hooks/useStats/useStats';

// @ts-ignore
statsHooks.getTotalBandwidth = jest.fn((kind) => (kind === 'bytesReceived' ? 0 : 1));
const mockGetTotalBandwidth = statsHooks.getTotalBandwidth as jest.Mock<any>;

jest.mock('../../hooks/useRoom/useRoom', () => jest.fn(() => 'mockRoom'));
jest.mock('../../hooks/useGetStats/useGetStats', () => jest.fn(() => 'mockStats'));

const mockUseGetStats = useGetStats as jest.Mock<any>;
const mockUseRoom = useRoom as jest.Mock<any>;

describe('the truncateFront function', () => {
  it('should remove elements from the front of the array so that the arrays length remains less than or equal to the specified limit', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(truncateFront(data, 10)).toEqual(data); // Do nothing when the limit is larger than the array length
    expect(truncateFront(data, 6)).toEqual([3, 4, 5, 6, 7, 8]);
  });
});

describe('the RoomStatsProvider component', () => {
  it('should correctly return stats and previousStats', () => {
    const wrapper: React.FC = ({ children }) => <RoomStatsProvider>{children}</RoomStatsProvider>;
    const { result, rerender } = renderHook(statsHooks.useStats, { wrapper });

    expect(mockUseRoom).toHaveBeenCalled();
    expect(mockUseGetStats).toHaveBeenCalledWith('mockRoom');

    expect(result.current).toMatchObject({ previousStats: undefined, stats: 'mockStats' });

    mockUseGetStats.mockImplementationOnce(() => 'mockStats2');
    rerender();

    expect(result.current).toMatchObject({ previousStats: 'mockStats', stats: 'mockStats2' });
  });

  it('should correctly return bandwidth statistics and history', () => {
    Date.now = () => 1000;

    const wrapper: React.FC = ({ children }) => <RoomStatsProvider>{children}</RoomStatsProvider>;
    const { result, rerender } = renderHook(statsHooks.useStats, { wrapper });

    expect(result.current).toMatchObject({
      receivedBitrateHistory: [{ x: 1000, y: 0 }],
      sentBitrateHistory: [{ x: 1000, y: 1 }],
      currentReceivedBitrate: 0,
      currentSentBitrate: 1,
    });

    Date.now = () => 2000;
    mockGetTotalBandwidth.mockImplementation((kind) => (kind === 'bytesReceived' ? 2 : 3));

    mockUseGetStats.mockImplementationOnce(() => 'mockStats2');
    rerender();

    expect(result.current).toMatchObject({
      receivedBitrateHistory: [
        { x: 1000, y: 0 },
        { x: 2000, y: 2 },
      ],
      sentBitrateHistory: [
        { x: 1000, y: 1 },
        { x: 2000, y: 3 },
      ],
      currentReceivedBitrate: 2,
      currentSentBitrate: 3,
    });
  });
});
