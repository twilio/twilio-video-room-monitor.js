import { useEffect, useState } from 'react';
import useRoom from '../useRoom/useRoom';

type RoomStateType = 'disconnected' | 'connected' | 'reconnecting';

export default function useRoomState() {
  const room = useRoom();
  const [state, setState] = useState<RoomStateType>('disconnected');

  useEffect(() => {
    if (room) {
      const setRoomState = () => setState((room.state || 'disconnected') as RoomStateType);
      setRoomState();
      room.on('disconnected', setRoomState).on('reconnected', setRoomState).on('reconnecting', setRoomState);
      return () => {
        room.off('disconnected', setRoomState).off('reconnected', setRoomState).off('reconnecting', setRoomState);
      };
    } else {
      setState('disconnected');
    }
  }, [room]);

  return state;
}
