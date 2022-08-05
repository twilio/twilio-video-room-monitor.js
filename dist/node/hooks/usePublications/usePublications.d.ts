import { LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video';
declare type TrackPublication = LocalTrackPublication | RemoteTrackPublication;
export default function usePublications(participant: Participant, isLocal?: boolean): TrackPublication[];
export {};
