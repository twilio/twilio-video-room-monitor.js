import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import useTrackSwitchOffReason from './useTrackSwitchOffReason';

describe('the useTrackSwitchOffReason hook', () => {
  let mockTrack: any;

  beforeEach(() => {
    mockTrack = new EventEmitter();
    mockTrack.switchOffReason = 'mock-switchoff-reason';
  });

  it('should return mockTrack.switchOffReason by default', () => {
    const { result } = renderHook(() => useTrackSwitchOffReason(mockTrack));
    expect(result.current).toBe('mock-switchoff-reason');
  });

  it('should respond to "switchedOn" events', async () => {
    const { result } = renderHook(() => useTrackSwitchOffReason(mockTrack));
    act(() => {
      mockTrack.switchOffReason = null;
      mockTrack.emit('switchedOn');
    });
    expect(result.current).toBe(null);
  });

  it('should respond to "switchedOff" events', async () => {
    const { result } = renderHook(() => useTrackSwitchOffReason(mockTrack));
    act(() => {
      mockTrack.switchOffReason = 'new-mock-switchoff-reason';
      mockTrack.emit('switchedOff');
    });
    expect(result.current).toBe('new-mock-switchoff-reason');
  });

  it('should clean up listeners on unmount', () => {
    const { unmount } = renderHook(() => useTrackSwitchOffReason(mockTrack));
    unmount();
    expect(mockTrack.listenerCount('switchedOn')).toBe(0);
    expect(mockTrack.listenerCount('switchedOff')).toBe(0);
  });
});
