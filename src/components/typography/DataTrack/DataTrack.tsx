import React from 'react';
import { LocalDataTrack, RemoteDataTrack } from 'twilio-video';

import Datum from '../Datum/Datum';

function Tracks({ track }: { track: LocalDataTrack | RemoteDataTrack }) {
  const { kind, maxPacketLifeTime, maxRetransmits, ordered, reliable } = track;

  const idProp = track.isEnabled === undefined ? { label: 'ID', value: track.id } : { label: 'SID', value: track.sid };

  return (
    <>
      <Datum label="Kind" value={kind} />
      <Datum label={idProp.label} value={idProp.value} />
      <Datum label="maxPacketLifeTime" value={maxPacketLifeTime} />
      <Datum label="maxRetransmits" value={maxRetransmits} />
      <Datum label="Ordered" value={ordered} />
      <Datum label="Reliable" value={reliable} />
    </>
  );
}
export default React.memo(Tracks);
