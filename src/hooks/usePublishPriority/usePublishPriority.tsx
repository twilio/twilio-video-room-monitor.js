import { useEffect, useState } from 'react';
import { LocalTrackPublication, RemoteTrackPublication, Track } from 'twilio-video';

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export default function usePublishPriority(publication: TrackPublication) {
  const [publishPriority, setPublishPriority] = useState<Track.Priority | null | undefined>(
    publication.publishPriority
  );

  useEffect(() => {
    setPublishPriority(publication.publishPriority);

    const handlePublishPriorityChanged = (priority: Track.Priority) => setPublishPriority(priority);

    publication.on('publishPriorityChanged', handlePublishPriorityChanged);
    return () => {
      publication.off('publishPriorityChanged', handlePublishPriorityChanged);
    };
  }, [publication]);

  return publishPriority;
}
