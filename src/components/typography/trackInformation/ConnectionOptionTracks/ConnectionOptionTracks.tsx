import React from 'react';
import { Room } from 'twilio-video';
import { Accordion } from '../../shared/Accordion/Accordion';
import Datum from '../../shared/Datum/Datum';
import MediaStreamTrackInfo from '../MediaStreamTrackInfo/MediaStreamTrackInfo';
import StatsContainer from '../../shared/StatsContainer/StatsContainer';
import DataTrack from '../DataTrack/DataTrack';

function ConnectionOptionTracks({ tracks }: { tracks: Room['_options']['tracks'] | null }) {
  if (typeof tracks === 'undefined' || tracks === null) {
    return <Datum label="Tracks" value={tracks} />;
  }
  return (
    <Accordion label="Tracks">
      {tracks.map((track, i) => {
        if (track instanceof MediaStreamTrack) {
          return (
            <StatsContainer key={i}>
              <MediaStreamTrackInfo track={track} />
            </StatsContainer>
          );
        }
        if (track.kind === 'audio' || track.kind === 'video') {
          const { kind, name, id, mediaStreamTrack } = track;
          return (
            <StatsContainer key={i}>
              <Datum label="Kind" value={kind} />
              <Datum label="Name" value={name} />
              <Datum label="ID" value={id} />
              <MediaStreamTrackInfo track={mediaStreamTrack} />
            </StatsContainer>
          );
        }
        // LocalDataTrack
        return (
          <StatsContainer key={i}>
            <DataTrack track={track} />
          </StatsContainer>
        );
      })}
    </Accordion>
  );
}

export default React.memo(ConnectionOptionTracks);
