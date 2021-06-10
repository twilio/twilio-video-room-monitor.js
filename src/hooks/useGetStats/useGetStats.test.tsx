import useGetStats from './useGetStats';
import { act, renderHook } from '@testing-library/react-hooks';
import { UPDATE_INTERVAL } from '../../constants';

const mockRoom = {
  getStats: jest.fn(() => Promise.resolve('mockStats')),
};

jest.useFakeTimers();

describe('the useGetStats hook', () => {
  it('should periodically return stats at the specified interval', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetStats(mockRoom as any));

    expect(result.current).toBe(undefined);

    await act(async () => {
      jest.runTimersToTime(UPDATE_INTERVAL);
      await waitForNextUpdate();
    });

    expect(result.current).toBe('mockStats');

    await act(async () => {
      mockRoom.getStats.mockImplementationOnce(() => Promise.resolve('mockStats2'));
      jest.runTimersToTime(UPDATE_INTERVAL);
      await waitForNextUpdate();
    });

    expect(result.current).toBe('mockStats2');
  });

  it('should call clearInterval on unmount', async () => {
    jest.spyOn(window, 'clearInterval');
    const { waitForNextUpdate, unmount } = renderHook(() => useGetStats(mockRoom as any));

    expect(window.clearInterval).not.toHaveBeenCalled();

    await act(async () => {
      await waitForNextUpdate();
    });

    unmount();
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should not call setInterval when there is no room', async () => {
    jest.spyOn(window, 'setInterval');
    const { result } = renderHook(() => useGetStats());
    expect(result.current).toBe(undefined);
    expect(window.setInterval).not.toHaveBeenCalled();
  });
});
