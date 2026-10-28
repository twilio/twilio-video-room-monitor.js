import { useState, useEffect } from 'react';
import type { EventEmitter } from 'events';
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
      // Subscribe through the shared EventEmitter base, since TypeScript can't resolve the
      // overloaded 'on' and 'off' methods across a union of track types.
      const emitter: EventEmitter = track;
      emitter.on('enabled', setEnabled);
      emitter.on('disabled', setDisabled);
      return () => {
        emitter.off('enabled', setEnabled);
        emitter.off('disabled', setDisabled);
      };
    }
  }, [track]);

  return isEnabled;
}
