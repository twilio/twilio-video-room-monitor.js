import { useState, useEffect } from 'react';
import { LocalAudioTrack, LocalVideoTrack, RemoteAudioTrack, RemoteVideoTrack } from 'twilio-video';

type TrackType = LocalAudioTrack | LocalVideoTrack | RemoteAudioTrack | RemoteVideoTrack;

export default function useTrackSwitchOffReason(track: TrackType) {
  const [switchOffReason, setSwitchOffReason] = useState(track?.switchOffReason);

  useEffect(() => {
    if (track) {
      setSwitchOffReason(track.switchOffReason);
      const handleEvent = () => setSwitchOffReason(track.switchOffReason);
      track.on('switchedOff', handleEvent);
      track.on('switchedOn', handleEvent);
      return () => {
        track.off('switchedOff', handleEvent);
        track.off('switchedOn', handleEvent);
      };
    }
  }, [track]);

  return switchOffReason;
}
