import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

type DatumProps = {
  label: string;
  value: string | number | boolean | null | undefined;
};

const Text = styled.span`
  font-size: ${theme.fontSizes.small};
`;

function Datum({ label, value }: DatumProps) {
  return (
    <div>
      <Text>
        {label}: {String(value)}
      </Text>
    </div>
  );
}

export default React.memo(Datum);
