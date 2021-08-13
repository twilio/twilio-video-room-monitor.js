import React from 'react';
import { LocalVideoTrack, LocalVideoTrackPublication, RemoteVideoTrack, RemoteVideoTrackPublication } from 'twilio-video';
export declare const VideoTrackInfo: React.FC<{
    track: LocalVideoTrack | RemoteVideoTrack;
    trackSid: string;
}>;
export declare const VideoTrackPublicationInfo: React.FC<{
    publication: LocalVideoTrackPublication | RemoteVideoTrackPublication;
}>;
