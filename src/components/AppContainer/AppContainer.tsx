import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import useDrag from '../../hooks/useDrag/useDrag';
import useRoom from '../../hooks/useRoom/useRoom';
import { theme } from '../theme';

createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
`;

const Container = styled.div`
  width: 500px;
  height: 85vh;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  border: 1px solid ${theme.borderColor};
  color: ${theme.borderColor};
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & span,
  & p {
    font-family: 'Inter', sans-serif;
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
  padding: 2px 0px 2px 8px;
  height: ${BAR_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CloseIcon = styled.div`
  background: ${theme.borderColor};
  height: 5px;
  position: relative;
  width: 2px;
  transform: rotate(45deg);
  &:after {
    background: ${theme.borderColor};
    content: '';
    height: 2px;
    left: -4px;
    position: absolute;
    top: 4px;
    width: 5px;
  }
`;

const CloseIconContainer = styled.div`
  border-left: 1px solid ${theme.borderColor};
  height: calc(${BAR_HEIGHT} - 1px);
  width: ${BAR_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & svg {
    stroke: ${theme.borderColor};
  }

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;

const RightBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TabSelector = styled.span<{ isActive: boolean }>`
  position: relative;
  margin: 0px 6px;
  color: ${(props) => (props.isActive ? theme.textColor : '#555')};
  cursor: pointer;

  &:first-child:after {
    content: '';
    position: absolute;
    height: 12px;
    background: #ddd;
    width: 1px;
    right: -6px;
    top: 4px;
  }
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
