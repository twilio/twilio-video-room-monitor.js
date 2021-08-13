import React from 'react';
import { Room } from 'twilio-video';
declare function ConnectionOptionTracks({ tracks }: {
    tracks: Room['_options']['tracks'] | null;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ConnectionOptionTracks>;
export default _default;
