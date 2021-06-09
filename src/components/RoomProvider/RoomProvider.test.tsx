import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import useRoom from '../../hooks/useRoom/useRoom';
import RoomProvider, * as RoomProviderObj from './RoomProvider';

const wrapper: React.FC = ({ children }) => <RoomProvider>{children}</RoomProvider>;

describe('the RoomProvider component', () => {
  afterEach(() => {
    RoomProviderObj.roomRegistry.room = undefined;
  });

  it('should return undefined by default', () => {
    const { result } = renderHook(useRoom, { wrapper });
    expect(result.current).toBe(undefined);
  });

  it('should return the room when it is registered before the RoomProvider has initialized', () => {
    RoomProviderObj.roomRegistry.registerTwilioRoom('mockRoom' as any);
    const { result } = renderHook(useRoom, { wrapper });
    expect(result.current).toBe('mockRoom');
  });

  it('should return the room when it is registered after the RoomProvider has initialized', () => {
    const { result } = renderHook(useRoom, { wrapper });
    act(() => {
      RoomProviderObj.roomRegistry.registerTwilioRoom('mockRoom' as any);
    });
    expect(result.current).toBe('mockRoom');
  });

  it('should remove listeners on unmount', () => {
    const { unmount } = renderHook(useRoom, { wrapper });

    expect(RoomProviderObj.roomRegistry.listenerCount('roomRegistered')).toBe(1);
    unmount();
    expect(RoomProviderObj.roomRegistry.listenerCount('roomRegistered')).toBe(0);
  });
});
