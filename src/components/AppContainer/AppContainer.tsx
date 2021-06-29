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
import TwilioRoomMonitor from '../../index';

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
        <span style={{ padding: '0.57em' }}>Twilio Room Monitor</span>
        <RightBarContainer>
          <TabSelector isActive={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            Info
          </TabSelector>
          <TabSelector isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
            Stats
          </TabSelector>
          <CopyButton />
          <CloseIconContainer onClick={() => TwilioRoomMonitor.closeMonitor()}>
            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.768 1.768a.347.347 0 01.491 0l15.973 15.973a.347.347 0 01-.492.49L1.768 2.26a.347.347 0 010-.49z"
                fill="#DDD"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.232 1.768a.347.347 0 010 .491L2.258 18.232a.347.347 0 11-.49-.491L17.74 1.768a.347.347 0 01.492"
                fill="#DDD"
              />
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
