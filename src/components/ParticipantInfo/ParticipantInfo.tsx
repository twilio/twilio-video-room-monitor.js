import React from 'react';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useRoom from '../../hooks/useRoom/useRoom';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import Headline from '../typography/common/Headline/Headline';
import { Participant } from './Participant/Participant';

export default function ParticipantInfo() {
  const participants = useParticipants();
  const room = useRoom();
  const roomState = useRoomState();

  if (!room || roomState === 'disconnected') return null;

  return (
    <>
      <Headline>Participant Information ({participants.length + 1}):</Headline>
      <Participant participant={room.localParticipant} />
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </>
  );
}
