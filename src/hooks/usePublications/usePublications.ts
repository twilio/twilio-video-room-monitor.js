import { useEffect, useRef, useState } from 'react';
import { LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video';
import { UPDATE_INTERVAL } from '../../constants';

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

// Returns true when the two publication arrays contain all the same sids, in any order.
// This helps to prevent any updates when only the order of publications has chagned.
function arePublicationArraysEqual(arr1: TrackPublication[], arr2: TrackPublication[]) {
  const sidString1 = arr1
    .map((p) => p.trackSid)
    .sort()
    .join('');
  const sidString2 = arr2
    .map((p) => p.trackSid)
    .sort()
    .join('');
  return sidString1 === sidString2;
}

export default function usePublications(participant: Participant, isLocal?: boolean) {
  const [publications, setPublications] = useState<TrackPublication[]>([]);
  const intervalIdRef = useRef<number>();

  useEffect(() => {
    // Local participants do not emit the 'trackUnpublished' event when a local track is unpublished.
    // Here we periodically check to see if the publications have changed, and we update the state when
    // they have changed.
    if (isLocal) {
      intervalIdRef.current = window.setInterval(() => {
        const newPublications = Array.from(participant.tracks.values()) as TrackPublication[];
        setPublications((oldPublications) =>
          // Returning the current state here does not trigger a re-render.
          arePublicationArraysEqual(oldPublications, newPublications) ? oldPublications : newPublications
        );
      }, UPDATE_INTERVAL);

      return () => {
        window.clearInterval(intervalIdRef.current);
      };
    }
  }, [participant, isLocal]);

  useEffect(() => {
    // Reset the publications when the 'participant' variable changes.
    setPublications(Array.from(participant.tracks.values()) as TrackPublication[]);

    const publicationAdded = (publication: TrackPublication) =>
      setPublications((prevPublications) => [...prevPublications, publication]);
    const publicationRemoved = (publication: TrackPublication) =>
      setPublications((prevPublications) => prevPublications.filter((p) => p !== publication));

    participant.on('trackPublished', publicationAdded);
    participant.on('trackUnpublished', publicationRemoved);
    return () => {
      participant.off('trackPublished', publicationAdded);
      participant.off('trackUnpublished', publicationRemoved);
    };
  }, [participant]);

  return publications;
}
