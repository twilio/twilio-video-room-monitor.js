import React from 'react';
import { LocalDataTrack, LocalDataTrackPublication, RemoteDataTrack, RemoteDataTrackPublication } from 'twilio-video';
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import useTrack from '../../../hooks/useTrack/useTrack';
import DataTrack from '../../typography/trackInformation/DataTrack/DataTrack';
import Datum from '../../typography/common/Datum/Datum';
import StatsContainer from '../../typography/common/StatsContainer/StatsContainer';

export const DataTrackInfo: React.FC<{
  track: LocalDataTrack | RemoteDataTrack;
}> = ({ track }) => {
  const isSwitchedOff = useIsTrackSwitchedOff(track);

  return (
    <>
      {/* isEnabled is always 'true' on data tracks */}
      <Datum label="isEnabled" value="true" />
      {/* Only show isSwitchedOff and priority for remote data tracks */}
      {track.isSwitchedOff !== undefined && <Datum label="isSwitchedOff" value={isSwitchedOff} />}
      {track.priority !== undefined && <Datum label="Priority" value={track.priority} />}
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
      <Datum label="isSubscribed" value={!!track} />
      {track && <DataTrackInfo track={track} />}
    </StatsContainer>
  );
};
