import React, { useEffect, useState } from 'react';
import { Room } from 'twilio-video';
import TwilioVideoInspector from '../../index';

export const RoomContext = React.createContext<Room | undefined>(undefined);

export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    if (TwilioVideoInspector.room) {
      setRoom(TwilioVideoInspector.room);
    }

    const handleRoomRegister = (room: Room) => setRoom(room);
    TwilioVideoInspector.on('roomRegistered', handleRoomRegister);

    return () => {
      TwilioVideoInspector.off('roomRegistered', handleRoomRegister);
    };
  }, []);

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
