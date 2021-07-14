import React from 'react';
import {
  LocalVideoTrack,
  LocalVideoTrackPublication,
  LocalVideoTrackStats,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
  RemoteVideoTrackStats,
  VideoTrack,
} from 'twilio-video';
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useMediaStreamTrack from '../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import usePublishPriority from '../../hooks/usePublishPriority/usePublishPriority';
import { useTrackBandwidth, useTrackData } from '../../hooks/useStats/useStatsUtils';
import useTrack from '../../hooks/useTrack/useTrack';
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';
import Datum from '../typography/Datum/Datum';
import MediaStreamTrackInfo from '../typography/MediaStreamTrackInfo/MediaStreamTrackInfo';
import StatsContainer from '../typography/StatsContainer/StatsContainer';

const getDimensionString = (dimensions?: VideoTrack.Dimensions) =>
  dimensions ? `${dimensions.width} x ${dimensions.height}` : 'undefined';

export const VideoTrackInfo: React.FC<{
  track: LocalVideoTrack | RemoteVideoTrack;
  trackSid: string; // Passing trackSid from the publication object because it not on the LocalVideoTrack object
}> = ({ track, trackSid }) => {
  const dimensions = useVideoTrackDimensions(track);
  const isSwitchedOff = useIsTrackSwitchedOff(track);
  const isEnabled = useIsTrackEnabled(track);
  const trackBandwidth = useTrackBandwidth(trackSid);
  const trackData = useTrackData(trackSid) as LocalVideoTrackStats | RemoteVideoTrackStats | null;
  const mediaStreamTrack = useMediaStreamTrack(track);

  let lossPercentage: string | null;

  if (trackData) {
    const { packetsReceived, packetsSent, packetsLost } = trackData;

    const totalPackets = packetsReceived ?? packetsSent;
    const numPacketsLost = packetsLost ?? 0;

    lossPercentage = totalPackets ? ((numPacketsLost / totalPackets) * 100).toLocaleString() : null;
  }

  return (
    <>
      <Datum label="Dimensions" value={getDimensionString(dimensions)} />
      <Datum label="isSwitchedOff" value={String(isSwitchedOff)} />
      <Datum label="isEnabled" value={String(isEnabled)} />
      <Datum label="Bandwidth" value={String(trackBandwidth?.toLocaleString()) + 'kbps'} />
      {trackData && (
        <>
          <Datum label="Codec" value={String(trackData.codec)} />
          <Datum label="Framerate" value={String(trackData?.frameRate)} />
          <Datum label="Packets Lost" value={String(trackData?.packetsLost)} />
          <Datum label="Packet Loss Percentage" value={String(lossPercentage!) + '%'} />
        </>
      )}
      <MediaStreamTrackInfo track={mediaStreamTrack} />
    </>
  );
};

export const VideoTrackPublicationInfo: React.FC<{
  publication: LocalVideoTrackPublication | RemoteVideoTrackPublication;
}> = ({ publication }) => {
  const publishPriority = usePublishPriority(publication);
  const track = useTrack(publication) as LocalVideoTrack | RemoteVideoTrack | undefined;

  return (
    <StatsContainer>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={String(!!track)} />
      <Datum label="publishPriority" value={String(publishPriority)} />
      {track && <VideoTrackInfo track={track} trackSid={publication.trackSid} />}
    </StatsContainer>
  );
};
