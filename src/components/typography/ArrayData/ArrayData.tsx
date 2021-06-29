import React from 'react';
import NestedObject from '../NestedObject/NestedObject';
import Datum from '../Datum/Datum';
import { Accordion } from '../Accordion/Accordion';
import { Arr } from '../../../types';
import StatsContainer from '../StatsContainer/StatsContainer';

function ArrayData({ label, arr }: { label: string; arr: Arr | null | undefined }) {
  if (typeof arr === 'undefined' || arr === null) {
    return <Datum label={label} value={arr} />;
  } else if (arr.length === 0) {
    return <Datum label={label} value="undefined" />;
  }
  return (
    <Accordion label={label}>
      {arr.map((obj, i) => (
        <StatsContainer key={i}>
          <NestedObject obj={obj} />
        </StatsContainer>
      ))}
    </Accordion>
  );
}
export default React.memo(ArrayData);
