import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import useDrag from '../../hooks/useDrag/useDrag';
import useRoom from '../../hooks/useRoom/useRoom';
import useWindowDimensions from '../../hooks/useWindowDimensions/useWindowDimensions';
import { CopyButton } from './CopyButton/CopyButton';
import {
  Bar,
  ChildrenContainer,
  Container,
  CloseIconContainer,
  RightBarContainer,
  TabSelector,
  OverflowContainer,
} from './styles';
import { VideoRoomMonitor } from '../../index';
import { theme } from '../theme';

createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
`;

export default function AppContainer({ children }: { children: (activeTab: 'info' | 'stats') => React.ReactNode }) {
  const { draggableRef, dragContainerRef } = useDrag();
  const [activeTab, setActiveTab] = useState<'info' | 'stats'>('info');
  const room = useRoom();
  const { width, height } = useWindowDimensions();

  let styles: React.CSSProperties = {};

  if (width < theme.monitorWidth) {
    const scale = width / theme.monitorWidth;
    styles = {
      transform: `scale(${scale})`,
      height: height * (1 / scale) + 'px',
    };
  }

  return (
    <Container ref={dragContainerRef as any} style={styles}>
      <Bar ref={draggableRef as any}>
        <span style={{ padding: '0.57em' }}>Twilio Video Room Monitor</span>
        <RightBarContainer>
          <TabSelector isActive={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            Info
          </TabSelector>
          <TabSelector isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
            Stats
          </TabSelector>
          <CopyButton />
          <CloseIconContainer onClick={() => VideoRoomMonitor.closeMonitor()}>
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
