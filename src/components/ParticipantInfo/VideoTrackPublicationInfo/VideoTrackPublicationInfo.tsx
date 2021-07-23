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
import useIsTrackEnabled from '../../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import usePublishPriority from '../../../hooks/usePublishPriority/usePublishPriority';
import { useTrackBandwidth, useTrackData } from '../../../hooks/useStats/useStatsUtils';
import useTrack from '../../../hooks/useTrack/useTrack';
import useVideoTrackDimensions from '../../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';
import Datum from '../../typography/shared/Datum/Datum';
import MediaStreamTrackInfo from '../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo';
import StatsContainer from '../../typography/shared/StatsContainer/StatsContainer';

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
      {isSwitchedOff !== undefined && <Datum label="isSwitchedOff" value={isSwitchedOff} />}
      <Datum label="isEnabled" value={isEnabled} />
      <Datum label="Bandwidth" value={trackBandwidth?.toLocaleString() + 'kbps'} />
      {trackData && (
        <>
          <Datum label="Codec" value={trackData.codec} />
          <Datum label="Framerate" value={trackData?.frameRate} />
          <Datum label="Packets Lost" value={trackData?.packetsLost} />
          <Datum label="Packet Loss Percentage" value={lossPercentage! + '%'} />
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
      <Datum label="isSubscribed" value={!!track} />
      <Datum label="publishPriority" value={publishPriority} />
      {track && <VideoTrackInfo track={track} trackSid={publication.trackSid} />}
    </StatsContainer>
  );
};
