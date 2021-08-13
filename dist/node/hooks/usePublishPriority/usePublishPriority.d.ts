import { LocalTrackPublication, RemoteTrackPublication, Track } from 'twilio-video';
declare type TrackPublication = LocalTrackPublication | RemoteTrackPublication;
export default function usePublishPriority(publication: TrackPublication): Track.Priority | null | undefined;
export {};
