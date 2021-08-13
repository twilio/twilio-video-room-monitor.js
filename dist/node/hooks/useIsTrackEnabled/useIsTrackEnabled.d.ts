import { LocalAudioTrack, LocalVideoTrack, LocalDataTrack, RemoteAudioTrack, RemoteDataTrack, RemoteVideoTrack } from 'twilio-video';
declare type TrackType = LocalAudioTrack | LocalVideoTrack | LocalDataTrack | RemoteAudioTrack | RemoteVideoTrack | RemoteDataTrack | undefined;
export default function useIsTrackEnabled(track: TrackType): boolean | undefined;
export {};
