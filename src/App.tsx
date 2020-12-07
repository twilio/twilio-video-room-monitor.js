import React from 'react';
import AppContainer from './ui/AppContainer';
import styled from 'styled-components';
import { Text } from './ui/Text';

const Headline = styled(Text)`
  font-size: 2em;
`;

export default function App() {
  return (
    <AppContainer>
      <Headline>Ahoy!</Headline>
    </AppContainer>
  );
}
