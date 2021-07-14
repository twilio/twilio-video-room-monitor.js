import React from 'react';
import { LocalAudioTrack, LocalDataTrack, LocalVideoTrack, Room } from 'twilio-video';
import { Accordion } from '../Accordion/Accordion';
import Datum from '../Datum/Datum';
import MediaStreamTracks from '../MediaStreamTracks/MediaStreamTracks';
import StatsContainer from '../StatsContainer/StatsContainer';

function Tracks({ tracks }: { tracks: Room['_options']['tracks'] | null }) {
  if (typeof tracks === 'undefined' || tracks === null) {
    return <Datum label="Tracks" value={tracks} />;
  }
  return (
    <Accordion label="Tracks">
      {tracks.map((track, i) => {
        if (track instanceof MediaStreamTrack) {
          return (
            <StatsContainer key={i}>
              <MediaStreamTracks track={track} />
            </StatsContainer>
          );
        }
        if (track instanceof LocalAudioTrack || track instanceof LocalVideoTrack) {
          const { kind, name, id, mediaStreamTrack } = track;
          return (
            <StatsContainer key={i}>
              <Datum label="Kind" value={kind} />
              <Datum label="Name" value={name} />
              <Datum label="ID" value={id} />
              <MediaStreamTracks track={mediaStreamTrack} />
            </StatsContainer>
          );
        }
        // LocalDataTrack
        const { kind, id, maxPacketLifeTime, maxRetransmits, ordered, reliable } = track;
        return (
          <StatsContainer key={i}>
            <Datum label="Kind" value={kind} />
            <Datum label="ID" value={id} />
            <Datum label="maxPacketLifeTime" value={maxPacketLifeTime} />
            <Datum label="maxRetransmits" value={maxRetransmits} />
            <Datum label="Ordered" value={ordered} />
            <Datum label="Reliable" value={reliable} />
          </StatsContainer>
        );
      })}
    </Accordion>
  );
}

export default React.memo(Tracks);
