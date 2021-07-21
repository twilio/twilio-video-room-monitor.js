import React from 'react';
import { LocalDataTrack, LocalDataTrackPublication, RemoteDataTrack, RemoteDataTrackPublication } from 'twilio-video';
import useIsTrackEnabled from '../../hooks/useIsTrackEnabled/useIsTrackEnabled';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useTrack from '../../hooks/useTrack/useTrack';
import DataTrack from '../typography/DataTrack/DataTrack';
import Datum from '../typography/Datum/Datum';
import StatsContainer from '../typography/StatsContainer/StatsContainer';

export const DataTrackInfo: React.FC<{
  track: LocalDataTrack | RemoteDataTrack;
}> = ({ track }) => {
  const isEnabled = useIsTrackEnabled(track);
  const isSwitchedOff = useIsTrackSwitchedOff(track);

  if (track.isEnabled === undefined || track.isSwitchedOff === undefined) {
    return <DataTrack track={track} />;
  }

  return (
    <>
      <Datum label="isEnabled" value={String(isEnabled)} />
      <Datum label="isSwitchedOff" value={String(isSwitchedOff)} />
      <Datum label="Priority" value={track.priority} />
      <DataTrack track={track} />
    </>
  );
};

export const DataTrackPublicationInfo: React.FC<{
  publication: LocalDataTrackPublication | RemoteDataTrackPublication;
}> = ({ publication }) => {
  const track = useTrack(publication) as LocalDataTrack | RemoteDataTrack | undefined;

  return (
    <StatsContainer>
      <Datum label="Kind" value={publication.kind} />
      <Datum label="isSubscribed" value={String(!!track)} />
      {track && <DataTrackInfo track={track} />}
    </StatsContainer>
  );
};
