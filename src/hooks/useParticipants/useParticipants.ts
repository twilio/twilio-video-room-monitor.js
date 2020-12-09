import { useEffect, useState } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useRoom from '../useRoom/useRoom';

export default function useParticipants() {
  const room = useRoom();
  const [participants, setParticipants] = useState(room ? Array.from(room.participants.values()) : []);

  useEffect(() => {
    if (!room) return;

    setParticipants(Array.from(room.participants.values()));

    const participantConnected = (participant: RemoteParticipant) =>
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    const participantDisconnected = (participant: RemoteParticipant) =>
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));

    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    return () => {
      room.off('participantConnected', participantConnected);
      room.off('participantDisconnected', participantDisconnected);
    };
  }, [room]);

  return participants;
}
