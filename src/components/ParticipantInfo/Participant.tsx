import React from 'react';
import { Accordion } from '../typography/Accordion/Accordion';
import Datum from '../typography/Datum/Datum';
import { Participant as ParticipantImpl, LocalVideoTrackPublication, RemoteVideoTrackPublication } from 'twilio-video';
import useParticipantNetworkQualityLevel from '../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import {
  useAudioTrackPublications,
  useDataTrackPublications,
  useVideoTrackPublications,
} from '../../hooks/usePublications/usePublications';

import { VideoTrackPublicationInfo } from './VideoTrackPublicationInfo';

export const Participant: React.FC<{ participant: ParticipantImpl }> = ({ participant }) => {
  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isReconnecting = useParticipantIsReconnecting(participant);

  const dataTrackPublications = useDataTrackPublications(participant);
  const audioTrackPublications = useAudioTrackPublications(participant);
  const videoTrackPublications = useVideoTrackPublications(participant);

  return (
    <Accordion label={participant.identity}>
      <Datum label="SID" value={participant.sid} />
      <Datum label="isReconnecting" value={String(isReconnecting)} />
      <Datum label="networkQualityLevel" value={String(networkQualityLevel)} />
      <Accordion label={`Data Tracks (${dataTrackPublications.length})`}></Accordion>
      <Accordion label={`Audio Tracks (${audioTrackPublications.length})`}></Accordion>
      <Accordion label={`Video Tracks (${videoTrackPublications.length})`}>
        {videoTrackPublications.map((videoTrackPublication) => (
          <VideoTrackPublicationInfo
            key={videoTrackPublication.trackSid}
            publication={videoTrackPublication as LocalVideoTrackPublication | RemoteVideoTrackPublication}
          />
        ))}
      </Accordion>
    </Accordion>
  );
};
