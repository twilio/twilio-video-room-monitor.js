import React, { useEffect, useState } from 'react';
import { Room } from 'twilio-video';

export const RoomContext = React.createContext<Room | undefined>(undefined);

export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    // Here we poll to get the room object. This is so the twilio-video-inspector can
    // handle the edge case where it is started before the user has connected to a room.
    const intervalID = setInterval(() => {
      try {
        // @ts-ignore
        const twilioRoom = window.getTwilioRoom();
        setRoom(twilioRoom);
      } catch (e) {}
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  });

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
