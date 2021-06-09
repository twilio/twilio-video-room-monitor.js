import React from 'react';
import styled from 'styled-components';
import {
  LocalAudioTrack,
  LocalAudioTrackPublication,
  LocalAudioTrackStats,
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteAudioTrackStats,
} from 'twilio-video';
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import { useTrackBandwidth, useTrackData } from '../../hooks/useStats/useStatsUtils';
import useTrack from '../../hooks/useTrack/useTrack';
import { theme } from '../theme';
import Datum from '../typography/Datum/Datum';

export const AudioTrackInfo: React.FC<{
  track: LocalAudioTrack | RemoteAudioTrack;
  trackSid: string; // Passing trackSid from the publication object because it not on the LocalAudioTrack object
}> = ({ track, trackSid }) => {
  const isEnabled = useIsTrackEnabled(track);
  const trackBandwidth = useTrackBandwidth(trackSid);
  const trackData = useTrackData(trackSid) as LocalAudioTrackStats | RemoteAudioTrackStats | null;

  const totalPackets = trackData ? (trackData as any).packetsReceived ?? (trackData as any).packetsSent : null;
  const lossPercentage = totalPackets && (trackData?.packetsLost || trackData?.packetsLost == 0) ? (trackData?.packetsLost/totalPackets) * 100 : null; 

  return (
    <>
      <Datum label="isEnabled" value={String(isEnabled)} />
      <Datum label="Bandwidth" value={String(trackBandwidth?.toLocaleString()) + 'kbps'} />
      {trackData && (
        <>
          <Datum label="Codec" value={String(trackData.codec)} />
          <Datum label="Jitter" value={String(trackData.jitter)} />
          <Datum label="Packets Lost" value={String(trackData.packetsLost)} />
          <Datum label="Packet Loss Percentage" value={String(lossPercentage?.toLocaleString()) + '%'} />
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
`;

export const AudioTrackPublicationInfo: React.FC<{
  publication: LocalAudioTrackPublication | RemoteAudioTrackPublication;
}> = ({ publication }) => {
  const track = useTrack(publication) as LocalAudioTrack | RemoteAudioTrack | undefined;

  return (
    <Container>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={String(!!track)} />
      {track && <AudioTrackInfo track={track} trackSid={publication.trackSid} />}
    </Container>
  );
};
