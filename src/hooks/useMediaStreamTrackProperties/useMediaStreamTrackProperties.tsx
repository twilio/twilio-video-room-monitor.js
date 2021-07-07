import { useEffect, useState } from 'react';

export default function useMediaStreamTrackProperties(mediaStreamTrack: MediaStreamTrack | undefined) {
  const [isMuted, setIsMuted] = useState(mediaStreamTrack?.muted);
  const [readyState, setReadyState] = useState(mediaStreamTrack?.readyState);

  useEffect(() => {
    setIsMuted(mediaStreamTrack?.muted);
    setReadyState(mediaStreamTrack?.readyState);
    if (mediaStreamTrack) {
      const handleMuted = () => setIsMuted(mediaStreamTrack?.muted);
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
    isMuted,
    readyState,
    id: mediaStreamTrack?.id,
    label: mediaStreamTrack?.label,
    kind: mediaStreamTrack?.kind,
  };
}
