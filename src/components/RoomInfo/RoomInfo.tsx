import React from 'react';
import useDominantSpeaker from '../../hooks/useDominantSpeaker/useDominantSpeaker';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';
import useRoom from '../../hooks/useRoom/useRoom';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import Datum from '../typography/Datum/Datum';
import Headline from '../typography/Headline/Headline';

export default function RoomInfo() {
  const room = useRoom();
  const dominantSpeaker = useDominantSpeaker();
  const roomState = useRoomState();
  const isRecording = useIsRecording();

  if (!room) return null;

  return (
    <div>
      <Headline>Room information:</Headline>
      {roomState === 'disconnected' ? (
        <span>Not connected to a Twilio Video room.</span>
      ) : (
        <>
          <Datum label="Room Name:" value={room.name} />
          <Datum label="SID" value={room.sid} />
          <Datum label="State" value={roomState} />
          <Datum label="Dominant Speaker" value={String(dominantSpeaker?.identity || null)} />
          <Datum label="Media Region" value={room.mediaRegion} />
          <Datum label="Is Recording" value={String(isRecording)} />
        </>
      )}
    </div>
  );
}
