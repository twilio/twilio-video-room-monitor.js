import React from 'react';
import styled from 'styled-components';
import useRoom from '../../hooks/useRoom/useRoom';
import { theme } from '../theme';

const CopyButtonContainer = styled.div<{ hasRoom: boolean }>`
  display: flex;
  margin: 0 7px;
  cursor: ${({ hasRoom }) => (hasRoom ? 'pointer' : 'initial')};

  & svg {
    stroke: ${({ hasRoom }) => (hasRoom ? theme.borderColor : '#333')};
  }
`;

export function CopyButton() {
  const room = useRoom();

  const handleRoomCopy = () => {
    if (room) {
      const text = JSON.stringify({ ...room, connectionOptions: room._options }, null, 2);
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <CopyButtonContainer onClick={handleRoomCopy} hasRoom={!!room} title="Copy Room Information">
      <svg width="20" height="20" viewBox="-2 -2 28 28" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      </svg>
    </CopyButtonContainer>
  );
}
