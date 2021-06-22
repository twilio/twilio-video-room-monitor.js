import React from 'react';
import { Accordion } from '../Accordion/Accordion';
import Datum from '../Datum/Datum';
import { Primitive } from '../../../types';
import StatsContainer from '../StatsContainer/StatsContainer';

function NestedObject({ label, obj }: { label?: string; obj: Object | Primitive }) {
  if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null) {
    return <Datum label={String(label)} value={obj} />;
  }
  const Component = label ? Accordion : StatsContainer;

  return (
    <Component label={label!}>
      {Object.entries(obj).map(([key, val]) => {
        if (typeof val === 'object' && !Array.isArray(val)) {
          // object
          return <NestedObject label={key} obj={val} />;
        } else {
          // primitives
          return <Datum label={key} value={String(val)} />;
        }
      })}
    </Component>
  );
}
export default React.memo(NestedObject);
