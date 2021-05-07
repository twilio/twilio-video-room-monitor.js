import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import RoomStatsProvider from './RoomStatsProvider';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';
import useStats from '../../hooks/useStats/useStats';

jest.mock('../../hooks/useRoom/useRoom', () => jest.fn(() => 'mockRoom'));
jest.mock('../../hooks/useGetStats/useGetStats', () => jest.fn(() => 'mockStats'));

const mockUseGetStats = useGetStats as jest.Mock<any>;
const mockUseRoom = useRoom as jest.Mock<any>;

describe('the RoomStatsProvider component', () => {
  it('should correctly return stats and previousStats', () => {
    const wrapper: React.FC = ({ children }) => <RoomStatsProvider>{children}</RoomStatsProvider>;
    const { result, rerender } = renderHook(useStats, { wrapper });

    expect(mockUseRoom).toHaveBeenCalled();
    expect(mockUseGetStats).toHaveBeenCalledWith('mockRoom');

    expect(result.current).toEqual({ previousStats: undefined, stats: 'mockStats' });

    mockUseGetStats.mockImplementationOnce(() => 'mockStats2');
    rerender();

    expect(result.current).toEqual({ previousStats: 'mockStats', stats: 'mockStats2' });
  });
});
