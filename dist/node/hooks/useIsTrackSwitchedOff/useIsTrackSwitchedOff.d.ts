import { LocalVideoTrack, LocalDataTrack, RemoteVideoTrack, RemoteDataTrack } from 'twilio-video';
declare type TrackType = RemoteVideoTrack | RemoteDataTrack | LocalVideoTrack | LocalDataTrack | undefined | null;
export default function useIsTrackSwitchedOff(track: TrackType): boolean;
export {};
