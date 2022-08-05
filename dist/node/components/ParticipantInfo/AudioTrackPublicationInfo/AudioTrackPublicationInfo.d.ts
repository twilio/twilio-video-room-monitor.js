import React from 'react';
import { LocalAudioTrack, LocalAudioTrackPublication, RemoteAudioTrack, RemoteAudioTrackPublication } from 'twilio-video';
export declare const AudioTrackInfo: React.FC<{
    track: LocalAudioTrack | RemoteAudioTrack;
    trackSid: string;
}>;
export declare const AudioTrackPublicationInfo: React.FC<{
    publication: LocalAudioTrackPublication | RemoteAudioTrackPublication;
}>;
