import React from 'react';
import styled from 'styled-components';
import {
  LocalAudioTrack,
  LocalAudioTrackPublication,
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
} from 'twilio-video';
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import { useTrackBandwidth } from '../../hooks/useStats/useStats';
import useTrack from '../../hooks/useTrack/useTrack';
import { theme } from '../theme';
import Datum from '../typography/Datum/Datum';

const AudioTrackInfo: React.FC<{
  track: LocalAudioTrack | RemoteAudioTrack;
}> = ({ track }) => {
  const isEnabled = useIsTrackEnabled(track);

  return (
    <>
      <Datum label="isEnabled" value={String(isEnabled)} />
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
  const trackBandwidth = useTrackBandwidth(publication.trackSid);

  return (
    <Container>
      <Datum label="Name" value={publication.trackName} />
      <Datum label="SID" value={publication.trackSid} />
      <Datum label="isSubscribed" value={String(!!track)} />
      <Datum label="bandwidth" value={String(trackBandwidth) + 'kbps'} />
      {track && <AudioTrackInfo track={track} />}
    </Container>
  );
};
