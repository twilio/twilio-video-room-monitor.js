import { useEffect, useState } from 'react';
import { RemoteParticipant } from 'twilio-video';
import useRoom from '../useRoom/useRoom';

export default function useDominantSpeaker() {
  const room = useRoom();
  const [dominantSpeaker, setDominantSpeaker] = useState(room.dominantSpeaker);

  useEffect(() => {
    if (room) {
      const handleDominantSpeakerChanged = (newDominantSpeaker: RemoteParticipant) =>
        setDominantSpeaker(newDominantSpeaker);

      room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
      return () => {
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
      };
    } else {
      setDominantSpeaker(null);
    }
  }, [room]);

  return dominantSpeaker;
}
