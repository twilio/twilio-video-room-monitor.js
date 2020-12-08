import React from 'react';
import styled from 'styled-components';
import useDrag from '../../hooks/useDrag/useDrag';
import useRoom from '../../hooks/useRoom/useRoom';
import { theme } from '../theme';

const Container = styled.div`
  width: 400px;
  height: 80vh;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  border: 1px solid ${theme.borderColor};
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & span,
  & p {
    color: ${theme.borderColor};
  }
`;

const Bar = styled.div`
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.borderColor};
  padding: 2px 8px;
`;

const ChildrenContainer = styled.div`
  padding: 30px 10px;
`;

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const { draggableRef, dragContainerRef } = useDrag();
  const room = useRoom();

  return (
    <Container ref={dragContainerRef as any}>
      <Bar ref={draggableRef as any}>
        <span>Twilio Video Inspector</span>
      </Bar>
      <ChildrenContainer>{room ? children : <span>No Twilio Room detected.</span>}</ChildrenContainer>
    </Container>
  );
}
