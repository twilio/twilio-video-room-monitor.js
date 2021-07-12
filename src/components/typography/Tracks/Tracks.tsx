import React from 'react';
import { Arr } from '../../../types';
import { Accordion } from '../Accordion/Accordion';
import Datum from '../Datum/Datum';
import MediaStreamTracks from '../MediaStreamTracks/MediaStreamTracks';
import StatsContainer from '../StatsContainer/StatsContainer';

function Tracks({ tracks }: { tracks: Arr | null | undefined }) {
  if (typeof tracks === 'undefined' || tracks === null) {
    return <Datum label="Tracks" value={tracks} />;
  }
  return (
    <Accordion label="Tracks">
      {tracks.map((track, i) => {
        if (track instanceof MediaStreamTrack) {
          return (
            <StatsContainer>
              <MediaStreamTracks track={track} />
            </StatsContainer>
          );
        } else {
          const { kind, name, id, mediaStreamTrack }: any = track;
          return (
            <StatsContainer>
              <Datum label="Kind" value={kind} />
              <Datum label="Name" value={name} />
              <Datum label="ID" value={id} />
              <MediaStreamTracks track={mediaStreamTrack} />
            </StatsContainer>
          );
        }
      })}
    </Accordion>
  );
}

export default React.memo(Tracks);
