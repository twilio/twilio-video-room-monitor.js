import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import useDrag from '../../hooks/useDrag/useDrag';
import useRoom from '../../hooks/useRoom/useRoom';
import { CopyButton } from './CopyButton';
import {
  Bar,
  ChildrenContainer,
  Container,
  CloseIconContainer,
  RightBarContainer,
  TabSelector,
  OverflowContainer,
} from './styles';

createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
`;

export default function AppContainer({ children }: { children: (activeTab: 'info' | 'stats') => React.ReactNode }) {
  const { draggableRef, dragContainerRef } = useDrag();
  const [activeTab, setActiveTab] = useState<'info' | 'stats'>('info');
  const room = useRoom();

  return (
    <Container ref={dragContainerRef as any}>
      <Bar ref={draggableRef as any}>
        <span>Twilio Video Inspector</span>
        <RightBarContainer>
          <TabSelector isActive={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            Info
          </TabSelector>
          <TabSelector isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
            Stats
          </TabSelector>
          <CopyButton />
          <CloseIconContainer onClick={() => window.TwilioVideoInspector.destroy()}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseIconContainer>
        </RightBarContainer>
      </Bar>
      <OverflowContainer>
        <ChildrenContainer>{room ? children(activeTab) : <span>No Twilio Room detected.</span>}</ChildrenContainer>
      </OverflowContainer>
    </Container>
  );
}
