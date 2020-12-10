import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

type DatumProps = {
  label: string;
  value: string;
};

const Text = styled.span`
  font-size: ${theme.fontSizes.small};
`;

export default function Datum({ label, value }: DatumProps) {
  return (
    <div>
      <Text>
        {label}: {value}
      </Text>
    </div>
  );
}
