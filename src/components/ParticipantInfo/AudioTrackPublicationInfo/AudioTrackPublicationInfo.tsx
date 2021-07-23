import React from 'react';
import {
  LocalAudioTrack,
  LocalAudioTrackPublication,
  LocalAudioTrackStats,
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteAudioTrackStats,
} from 'twilio-video';
import useIsTrackEnabled from '../../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import useMediaStreamTrack from '../../../hooks/useMediaStreamTrack/useMediaStreamTrack';
import { useTrackBandwidth, useTrackData } from '../../../hooks/useStats/useStatsUtils';
import useTrack from '../../../hooks/useTrack/useTrack';
import Datum from '../../typography/shared/Datum/Datum';
import MediaStreamTrackInfo from '../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo';
import StatsContainer from '../../typography/shared/StatsContainer/StatsContainer';

export const AudioTrackInfo: React.FC<{
  track: LocalAudioTrack | RemoteAudioTrack;
  trackSid: string; // Passing trackSid from the publication object because it not on the LocalAudioTrack object
}> = ({ track, trackSid }) => {
  const isEnabled = useIsTrackEnabled(track);
  const trackBandwidth = useTrackBandwidth(trackSid);
  const trackData = useTrackData(trackSid) as LocalAudioTrackStats | RemoteAudioTrackStats | null;
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
      <Datum label="isEnabled" value={isEnabled} />
      <Datum label="Bandwidth" value={trackBandwidth?.toLocaleString() + 'kbps'} />
      {trackData && (
        <>
          <Datum label="Codec" value={trackData.codec} />
          <Datum label="Jitter" value={trackData.jitter} />
          <Datum label="Packets Lost" value={trackData.packetsLost} />
          <Datum label="Packet Loss Percentage" value={lossPercentage! + '%'} />
        </>
      )}
      <MediaStreamTrackInfo track={mediaStreamTrack} />
    </>
  );
};

export const AudioTrackPublicationInfo: React.FC<{
  publication: LocalAudioTrackPublication | RemoteAudioTrackPublication;
}> = ({ publication }) => {
  const track = useTrack(publication) as LocalAudioTrack | RemoteAudioTrack | undefined;

  return (
    <StatsContainer>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={!!track} />
      {track && <AudioTrackInfo track={track} trackSid={publication.trackSid} />}
    </StatsContainer>
  );
};
