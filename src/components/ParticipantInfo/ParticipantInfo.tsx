import React from 'react';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useRoom from '../../hooks/useRoom/useRoom';
import Headline from '../typography/Headline/Headline';
import { Participant } from './Participant';

export default function ParticipantInfo() {
  const participants = useParticipants();
  const room = useRoom();

  if (!room) return null;

  return (
    <>
      <Headline>Participant Information ({participants.length}):</Headline>
      <Participant participant={room.localParticipant} />
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </>
  );
}
