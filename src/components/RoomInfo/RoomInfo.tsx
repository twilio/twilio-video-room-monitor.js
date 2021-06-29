import React from 'react';
import Datum from '../typography/Datum/Datum';
import Headline from '../typography/Headline/Headline';
import useDominantSpeaker from '../../hooks/useDominantSpeaker/useDominantSpeaker';
import useIsRecording from '../../hooks/useIsRecording/useIsRecording';
import useRoom from '../../hooks/useRoom/useRoom';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useStats from '../../hooks/useStats/useStats';
import { Accordion } from '../typography/Accordion/Accordion';
import NestedObject from '../typography/NestedObject/NestedObject';
import ArrayData from '../typography/ArrayData/ArrayData';

export default function RoomInfo() {
  const room = useRoom();
  const dominantSpeaker = useDominantSpeaker();
  const roomState = useRoomState();
  const isRecording = useIsRecording();
  const { currentReceivedBitrate, currentSentBitrate } = useStats();

  if (!room) return null;

  const {
    audio,
    automaticSubscription,
    bandwidthProfile,
    dscpTagging,
    enableDscp,
    iceServers,
    iceTransportPolicy,
    insights,
    maxAudioBitrate,
    maxVideoBitrate,
    name,
    networkQuality,
    region,
    preferredAudioCodecs,
    preferredVideoCodecs,
    loggerName,
    tracks,
    video,
  } = room._options;

  return (
    <div style={{ marginBottom: '1em' }}>
      <Headline>Room information:</Headline>
      {roomState === 'disconnected' ? (
        <span>Not connected to a Twilio Video room.</span>
      ) : (
        <>
          <Datum label="Room Name" value={room.name} />
          <Datum label="SID" value={room.sid} />
          <Datum label="State" value={roomState} />
          <Datum label="Dominant Speaker" value={String(dominantSpeaker?.identity || null)} />
          <Datum label="Media Region" value={room.mediaRegion} />
          <Datum label="Is Recording" value={isRecording} />
          <Datum label="Total Sent Bandwidth" value={currentSentBitrate?.toLocaleString() + 'kbps'} />
          <Datum label="Total Received Bandwidth" value={currentReceivedBitrate?.toLocaleString() + 'kbps'} />

          <Accordion label="Connection Options">
            <NestedObject label="Audio" obj={audio} />
            <Datum label="Automatic Subscription" value={automaticSubscription} />
            <NestedObject label="Bandwidth Profile" obj={bandwidthProfile} />
            <Datum label="Dominant Speaker" value={room._options.dominantSpeaker} />
            <Datum label="DSCP Tagging" value={dscpTagging} />
            <Datum label="Enable DSCP" value={enableDscp} />
            <ArrayData label="Ice Servers" arr={iceServers} />
            <NestedObject label="Ice Transport Policy" obj={iceTransportPolicy} />
            <Datum label="Insights" value={insights} />
            <Datum label="Max Audio Bitrate" value={maxAudioBitrate} />
            <Datum label="Max Video Bitrate" value={maxVideoBitrate} />
            <Datum label="Name" value={name} />
            <NestedObject label="Network Quality" obj={networkQuality} />
            <Datum label="Region" value={region} />
            <ArrayData label="Preferred Audio Codecs" arr={preferredAudioCodecs} />
            <ArrayData label="Preferred Video Codecs" arr={preferredVideoCodecs} />
            <Datum label="Logger Name" value={loggerName} />
            <ArrayData label="Tracks" arr={tracks} />
            <NestedObject label="Video" obj={video} />
          </Accordion>
        </>
      )}
    </div>
  );
}
