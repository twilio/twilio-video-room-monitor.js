import React from 'react';
import useMediaStreamTrackProperties from '../../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties';
import NestedObject from '../../common/NestedObject/NestedObject';

function MediaStreamTrackInfo({ track }: { track: MediaStreamTrack | undefined }) {
  const mediaStreamTrackProperties = useMediaStreamTrackProperties(track);
  return <NestedObject label="Media Stream Track" obj={mediaStreamTrackProperties} />;
}

export default React.memo(MediaStreamTrackInfo);
