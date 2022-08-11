import React from 'react';
import Datum from '../../common/Datum/Datum';
import NestedObject from '../../common/NestedObject/NestedObject';
import useMediaStreamTrackProperties from '../../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties';

function MediaStreamTrackInfo({ track }: { track: MediaStreamTrack | null }) {
  if (track === null) {
    return <Datum label="Media Stream Track" value="null" />;
  }

  return <MediaStreamTrackProperties track={track} />;
}

function MediaStreamTrackProperties({ track }: { track: MediaStreamTrack }) {
  const mediaStreamTrackProperties = useMediaStreamTrackProperties(track);
  return <NestedObject label="Media Stream Track" obj={mediaStreamTrackProperties} />;
}

export default React.memo(MediaStreamTrackInfo);
