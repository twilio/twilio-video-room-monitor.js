import React from 'react';
import styled from 'styled-components';
import useDrag from '../../hooks/useDrag/useDrag';
import useRoom from '../../hooks/useRoom/useRoom';
import { theme } from '../theme';

const Container = styled.div`
  width: 400px;
  height: min(400px, 80vh);
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

const BAR_HEIGHT = '25px';

const Bar = styled.div`
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.borderColor};
  padding: 2px 8px;
  height: ${BAR_HEIGHT};
`;

const OverflowContainer = styled.div`
  overflow: hidden;
  height: 100%;
  padding-top: ${BAR_HEIGHT};
`;

const ChildrenContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0px 10px 20px;
`;

export default function AppContainer({ children }: { children: React.ReactNode }) {
  const { draggableRef, dragContainerRef } = useDrag();
  const room = useRoom();

  return (
    <Container ref={dragContainerRef as any}>
      <Bar ref={draggableRef as any}>
        <span>Twilio Video Inspector</span>
      </Bar>
      <OverflowContainer>
        <ChildrenContainer>{true ? children : <span>No Twilio Room detected.</span>}</ChildrenContainer>
      </OverflowContainer>
    </Container>
  );
}
