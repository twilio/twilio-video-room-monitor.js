import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { Accordion } from '../Accordion/Accordion';
import Datum from '../Datum/Datum';
import { Primitive, Obj } from '../../../types';

const Container = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.borderColor};
    margin-bottom: 3px;
  }
  padding-bottom: 3px;

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;

function NestedObject({ label, obj }: { label?: string; obj: Obj | Primitive }) {
  if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null) {
    return <Datum label={String(label)} value={obj} />;
  }
  const Component = label ? Accordion : Container;

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
