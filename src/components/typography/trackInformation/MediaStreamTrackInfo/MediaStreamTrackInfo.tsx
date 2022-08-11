import React from 'react';
import useMediaStreamTrackProperties from '../../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties';
import Datum from '../../common/Datum/Datum';
import NestedObject from '../../common/NestedObject/NestedObject';

function MediaStreamTrackInfo({ track }: { track: MediaStreamTrack | null }) {
  const mediaStreamTrackProperties = useMediaStreamTrackProperties(track);

  if (track === null) {
    return <Datum label="Media Stream Track" value="null" />;
  }

  return <NestedObject label="Media Stream Track" obj={mediaStreamTrackProperties} />;
}

export default React.memo(MediaStreamTrackInfo);
