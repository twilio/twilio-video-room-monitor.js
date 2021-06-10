import React, { useEffect, useState } from 'react';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';

class RoomRegistry extends EventEmitter<{ roomRegistered: [Room] }> {
  room?: Room;

  registerVideoRoom(room: Room) {
    this.room = room;
    this.emit('roomRegistered', room);
  }
}

export const roomRegistry = new RoomRegistry();

export const RoomContext = React.createContext<Room | undefined>(undefined);

export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (roomRegistry.room) {
      setRoom(roomRegistry.room);
    }

    const handleRoomRegister = (room: Room) => setRoom(room);
    roomRegistry.on('roomRegistered', handleRoomRegister);

    return () => {
      roomRegistry.off('roomRegistered', handleRoomRegister);
    };
  }, []);

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
