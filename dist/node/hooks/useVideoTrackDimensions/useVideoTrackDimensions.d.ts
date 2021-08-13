import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video';
declare type TrackType = LocalVideoTrack | RemoteVideoTrack;
export default function useVideoTrackDimensions(track?: TrackType): import("twilio-video").VideoTrack.Dimensions | undefined;
export {};
