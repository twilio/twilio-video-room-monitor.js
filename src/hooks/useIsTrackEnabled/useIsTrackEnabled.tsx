import { useState, useEffect } from 'react';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  LocalDataTrack,
  RemoteAudioTrack,
  RemoteDataTrack,
  RemoteVideoTrack,
} from 'twilio-video';

type TrackType =
  | LocalAudioTrack
  | LocalVideoTrack
  | LocalDataTrack
  | RemoteAudioTrack
  | RemoteVideoTrack
  | RemoteDataTrack
  | undefined;

export default function useIsTrackEnabled(track: TrackType) {
  const [isEnabled, setIsEnabled] = useState(track ? track.isEnabled : false);

  useEffect(() => {
    setIsEnabled(track ? track.isEnabled : false);

    if (track) {
      const setEnabled = () => setIsEnabled(true);
      const setDisabled = () => setIsEnabled(false);
      track.on('enabled', setEnabled);
      track.on('disabled', setDisabled);
      return () => {
        track.off('enabled', setEnabled);
        track.off('disabled', setDisabled);
      };
    }
  }, [track]);

  return isEnabled;
}
