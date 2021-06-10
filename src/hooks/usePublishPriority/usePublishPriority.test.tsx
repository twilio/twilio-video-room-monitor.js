import { act, renderHook } from '@testing-library/react-hooks';
import EventEmitter from 'events';
import usePublishPriority from './usePublishPriority';

describe('the usePublishPriority hook', () => {
  let mockPublication: any;

  beforeEach(() => {
    mockPublication = new EventEmitter();
  });

  it('should return mockPublication.publishPriority by default', () => {
    mockPublication.publishPriority = 'low';
    const { result } = renderHook(() => usePublishPriority(mockPublication));
    expect(result.current).toBe('low');
  });

  it('should respond to "publishPriorityChanged" events', async () => {
    mockPublication.publishPriority = 'low';
    const { result } = renderHook(() => usePublishPriority(mockPublication));
    act(() => {
      mockPublication.emit('publishPriorityChanged', 'high');
    });
    expect(result.current).toBe('high');
  });

  it('should clean up listeners on unmount', () => {
    const { unmount } = renderHook(() => usePublishPriority(mockPublication));
    expect(mockPublication.listenerCount('publishPriorityChanged')).toBe(1);
    unmount();
    expect(mockPublication.listenerCount('publishPriorityChanged')).toBe(0);
  });
});
