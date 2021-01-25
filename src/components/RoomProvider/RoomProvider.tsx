import React, { useEffect, useState } from 'react';
import { Room } from 'twilio-video';

export const RoomContext = React.createContext<Room | undefined>(undefined);

export default function RoomProvider({ children }: { children: React.ReactNode }) {
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    // Here we poll to get the room object. This is so the twilio-video-inspector can
    // handle the edge case where it is started before the user has connected to a room.
    const intervalID = setInterval(() => {
      // @ts-ignore
      if (window._TwilioVideo && window._TwilioVideo.rooms.length > 0) {
        // @ts-ignore
        setRoom(window._TwilioVideo.rooms[0]);
        // @ts-ignore
      } else if (window.getTwilioRoom) {
        // @ts-ignore
        setRoom(window.getTwilioRoom());
        // @ts-ignore
      } else if (window.twilioRoom) {
        // @ts-ignore
        setRoom(window.twilioRoom);
      }
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  });

  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
