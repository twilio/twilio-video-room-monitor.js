import React from 'react';
import { Accordion } from '../Accordion/Accordion';
import Datum from '../Datum/Datum';
import { Primitive } from '../../../types';
import StatsContainer from '../StatsContainer/StatsContainer';
import useMediaStreamTrackProperties from '../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties';

function NestedObject({ label, obj }: { label?: string; obj: Object | Primitive }) {
  if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null) {
    return <Datum label={String(label)} value={obj} />;
  }
  const Component = label ? Accordion : StatsContainer;

  return (
    <Component label={label!}>
      {Object.entries(obj).map(([key, val], i) => {
        if (typeof val === 'object' && !Array.isArray(val)) {
          // object
          if (val instanceof MediaStreamTrack) {
            const mediaStreamTrackProperties = useMediaStreamTrackProperties(val);
            return <NestedObject key={i} label={key} obj={mediaStreamTrackProperties} />;
          }
          return <NestedObject key={i} label={key} obj={val} />;
        } else {
          // primitives
          return <Datum key={i} label={key} value={val} />;
        }
      })}
    </Component>
  );
}
export default React.memo(NestedObject);
