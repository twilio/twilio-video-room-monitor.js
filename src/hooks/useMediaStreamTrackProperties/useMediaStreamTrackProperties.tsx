import { useEffect, useState } from 'react';

export default function useMediaStreamTrackProperties(mediaStreamTrack: MediaStreamTrack | undefined | null) {
  const [muted, setMuted] = useState(mediaStreamTrack?.muted);
  const [readyState, setReadyState] = useState(mediaStreamTrack?.readyState);

  useEffect(() => {
    setMuted(mediaStreamTrack?.muted);
    setReadyState(mediaStreamTrack?.readyState);
    if (mediaStreamTrack) {
      const handleMuted = () => setMuted(mediaStreamTrack?.muted);
      const handleReadyState = () => setReadyState(mediaStreamTrack?.readyState);

      mediaStreamTrack.addEventListener('mute', handleMuted);
      mediaStreamTrack.addEventListener('unmute', handleMuted);
      mediaStreamTrack.addEventListener('ended', handleReadyState);
      return () => {
        mediaStreamTrack.removeEventListener('mute', handleMuted);
        mediaStreamTrack.removeEventListener('unmute', handleMuted);
        mediaStreamTrack.removeEventListener('ended', handleReadyState);
      };
    }
  }, [mediaStreamTrack]);

  return {
    muted,
    readyState,
    id: mediaStreamTrack?.id,
    label: mediaStreamTrack?.label,
    kind: mediaStreamTrack?.kind,
  };
}
