import React, { useEffect, useState } from 'react';
import { Room } from 'twilio-video';
import EventEmitter from 'eventemitter3';

export const roomRegistry = new EventEmitter();

export const RoomContext = React.createContext<Room | undefined>(undefined);

export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    const handleRoomRegister = (room: Room) => setRoom(room);
    roomRegistry.on('roomRegistered', handleRoomRegister);

    return () => {
      roomRegistry.off('roomRegistered', handleRoomRegister);
    };
  }, []);

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
