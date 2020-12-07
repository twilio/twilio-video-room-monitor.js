import React from 'react';
import styled from 'styled-components';
import useDrag from '../hooks/useDrag/useDrag';
import { theme } from './theme';
import { Text } from './Text';

const Container = styled.div`
  width: 400px;
  height: 80vh;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  border: 1px solid ${theme.textColor};
`;

const Bar = styled.div`
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.textColor};
  padding: 2px 8px;
`;

const ChildrenContainer = styled.div`
  padding: 30px 10px;
`;

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const { draggableRef, dragContainerRef } = useDrag();

  return (
    <Container ref={dragContainerRef as any}>
      <Bar ref={draggableRef as any}>
        <Text>Twilio Video Inspector</Text>
      </Bar>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
}
