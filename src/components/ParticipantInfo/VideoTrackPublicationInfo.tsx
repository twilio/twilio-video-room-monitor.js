import React from 'react';
import styled from 'styled-components';
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
import usePublishPriority from '../../hooks/usePublishPriority/usePublishPriority';
import { useTrackBandwidth, useTrackData } from '../../hooks/useStats/useStatsUtils';
import useTrack from '../../hooks/useTrack/useTrack';
import useVideoTrackDimensions from '../../hooks/useVideoTrackDimensions/useVideoTrackDimensions';
import { theme } from '../theme';
import Datum from '../typography/Datum/Datum';

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

  return (
    <>
      <Datum label="Dimensions" value={getDimensionString(dimensions)} />
      <Datum label="isSwitchedOff" value={String(isSwitchedOff)} />
      <Datum label="isEnabled" value={String(isEnabled)} />
      <Datum label="Bandwidth" value={String(trackBandwidth) + 'kbps'} />
      {trackData && (
        <>
          <Datum label="Codec" value={String(trackData.codec)} />
          <Datum label="Framerate" value={String(trackData?.frameRate)} />
          <Datum label="Packets Lost" value={String(trackData?.packetsLost)} />
        </>
      )}
    </>
  );
};

const Container = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.borderColor};
    margin-bottom: 3px;
  }
  padding-bottom: 3px;

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;

export const VideoTrackPublicationInfo: React.FC<{
  publication: LocalVideoTrackPublication | RemoteVideoTrackPublication;
}> = ({ publication }) => {
  const publishPriority = usePublishPriority(publication);
  const track = useTrack(publication) as LocalVideoTrack | RemoteVideoTrack | undefined;

  const handleMouseEnter = () => {
    // @ts-ignore
    track?._attachments?.forEach((el) => {
      el.style.filter = 'brightness(1.5)';
    });
  };

  const handleMouseLeave = () => {
    // @ts-ignore
    track?._attachments?.forEach((el) => {
      el.style.filter = '';
    });
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={String(!!track)} />
      <Datum label="publishPriority" value={String(publishPriority)} />
      {track && <VideoTrackInfo track={track} trackSid={publication.trackSid} />}
    </Container>
  );
};
