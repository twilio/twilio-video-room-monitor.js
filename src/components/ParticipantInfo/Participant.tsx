import React from 'react';
import { Accordion } from '../typography/Accordion/Accordion';
import Datum from '../typography/Datum/Datum';
import {
  Participant as ParticipantImpl,
  LocalVideoTrackPublication,
  RemoteVideoTrackPublication,
  LocalAudioTrackPublication,
  RemoteAudioTrackPublication,
  LocalDataTrackPublication,
  RemoteDataTrackPublication,
} from 'twilio-video';
import useParticipantNetworkQualityLevel from '../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting/useParticipantIsReconnecting';
import usePublications from '../../hooks/usePublications/usePublications';

import { VideoTrackPublicationInfo } from './VideoTrackPublicationInfo';
import { AudioTrackPublicationInfo } from './AudioTrackPublicationInfo';
import { DataTrackPublicationInfo } from './DataTrackPublicationInfo';

export const Participant = ({ participant }: { participant: ParticipantImpl }) => {
  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isReconnecting = useParticipantIsReconnecting(participant);

  const publications = usePublications(participant);

  const dataTrackPublications = publications.filter((publication) => publication.kind === 'data');
  const audioTrackPublications = publications.filter((publication) => publication.kind === 'audio');
  const videoTrackPublications = publications.filter((publication) => publication.kind === 'video');

  return (
    <Accordion label={participant.identity}>
      <Datum label="SID" value={participant.sid} />
      <Datum label="isReconnecting" value={String(isReconnecting)} />
      <Datum label="networkQualityLevel" value={String(networkQualityLevel)} />
      <Accordion label={`Data Tracks (${dataTrackPublications.length})`}>
        {dataTrackPublications.map((dataTrackPublication) => (
          <DataTrackPublicationInfo
            publication={dataTrackPublication as LocalDataTrackPublication | RemoteDataTrackPublication}
          />
        ))}
      </Accordion>
      <Accordion label={`Audio Tracks (${audioTrackPublications.length})`}>
        {audioTrackPublications.map((audioTrackPublication) => (
          <AudioTrackPublicationInfo
            key={audioTrackPublication.trackSid}
            publication={audioTrackPublication as LocalAudioTrackPublication | RemoteAudioTrackPublication}
          />
        ))}
      </Accordion>
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
