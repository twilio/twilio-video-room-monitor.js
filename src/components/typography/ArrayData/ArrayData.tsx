import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import NestedObject from '../NestedObject/NestedObject';
import Datum from '../Datum/Datum';
import { Accordion } from '../Accordion/Accordion';
import { Arr } from '../../../types';

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

function ArrayData({ label, arr }: { label: string; arr: Arr }) {
  if (typeof arr === 'undefined' || arr === null) {
    return <Datum label={label} value={arr} />;
  } else if (arr.length === 0) {
    return <Datum label={label} value="undefined" />;
  }
  return (
    <Accordion label={label}>
      {arr.map((obj) => (
        <Container>
          <NestedObject key="{obj}" obj={obj} />
        </Container>
      ))}
    </Accordion>
  );
}
export default React.memo(ArrayData);
