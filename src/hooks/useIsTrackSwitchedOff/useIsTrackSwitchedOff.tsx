import { useState, useEffect } from 'react';
import type { EventEmitter } from 'events';
import { LocalVideoTrack, LocalDataTrack, RemoteVideoTrack, RemoteDataTrack } from 'twilio-video';

type TrackType = RemoteVideoTrack | RemoteDataTrack | LocalVideoTrack | LocalDataTrack | undefined | null;

// The 'switchedOff' event is emitted when there is not enough bandwidth to support
// a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs

export default function useIsTrackSwitchedOff(track: TrackType) {
  const [isSwitchedOff, setIsSwitchedOff] = useState(track && track.isSwitchedOff);

  useEffect(() => {
    // Reset the value if the 'track' variable changes
    setIsSwitchedOff(track && track.isSwitchedOff);

    if (track) {
      const handleSwitchedOff = () => setIsSwitchedOff(true);
      const handleSwitchedOn = () => setIsSwitchedOff(false);
      // Subscribe through the shared EventEmitter base, since TypeScript can't resolve the
      // overloaded 'on' and 'off' methods across a union of track types.
      const emitter: EventEmitter = track;
      emitter.on('switchedOff', handleSwitchedOff);
      emitter.on('switchedOn', handleSwitchedOn);
      return () => {
        emitter.off('switchedOff', handleSwitchedOff);
        emitter.off('switchedOn', handleSwitchedOn);
      };
    }
  }, [track]);

  return !!isSwitchedOff;
}
