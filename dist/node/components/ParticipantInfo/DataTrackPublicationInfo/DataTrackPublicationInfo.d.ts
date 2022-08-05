import React from 'react';
import { LocalDataTrack, LocalDataTrackPublication, RemoteDataTrack, RemoteDataTrackPublication } from 'twilio-video';
export declare const DataTrackInfo: React.FC<{
    track: LocalDataTrack | RemoteDataTrack;
}>;
export declare const DataTrackPublicationInfo: React.FC<{
    publication: LocalDataTrackPublication | RemoteDataTrackPublication;
}>;
