import React from 'react';
import {
  LocalVideoTrack,
  LocalVideoTrackPublication,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
  VideoTrack,
} from 'twilio-video';
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useTrack from '../../hooks/useTrack/useTrack';
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';
import Datum from '../typography/Datum/Datum';

const getDimensionString = (dimensions?: VideoTrack.Dimensions) =>
  dimensions ? `${dimensions.width} x ${dimensions.height}` : 'undefined';

const VideoTrackInfo: React.FC<{
  track: LocalVideoTrack | RemoteVideoTrack;
}> = ({ track }) => {
  const dimensions = useVideoTrackDimensions(track);
  const isSwitchedOff = useIsTrackSwitchedOff(track);
  const isEnabled = useIsTrackEnabled(track);

  return (
    <>
      <Datum label="Dimensions" value={getDimensionString(dimensions)} />
      <Datum label="isSwitchedOff" value={String(isSwitchedOff)} />
      <Datum label="isEnabled" value={String(isEnabled)} />
    </>
  );
};

export const VideoTrackPublication: React.FC<{
  publication: LocalVideoTrackPublication | RemoteVideoTrackPublication;
}> = ({ publication }) => {
  const track = useTrack(publication) as LocalVideoTrack | RemoteVideoTrack | undefined;

  return (
    <>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={String(!!track)} />
      <Datum label="publishPriority" value={String(publication.publishPriority)} />
      {track && <VideoTrackInfo track={track} />}
    </>
  );
};
