import React from 'react';
import { LocalDataTrack, RemoteDataTrack } from 'twilio-video';
declare function Tracks({ track }: {
    track: LocalDataTrack | RemoteDataTrack;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Tracks>;
export default _default;
