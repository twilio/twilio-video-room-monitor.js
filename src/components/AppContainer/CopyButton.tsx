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
      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.917.413c0-.274.223-.496.5-.496h6.666c.133 0 .26.052.354.145l5 4.959c.093.093.146.219.146.35v11.57a.498.498 0 01-.5.496H5.417a.498.498 0 01-.5-.495V.412zm1 .495v15.538h10.666V5.576L11.876.909h-5.96z"
          fill="#DDD"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.083-.083c.276 0 .5.222.5.496v4.462h4.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-5a.498.498 0 01-.5-.496V.413c0-.274.224-.496.5-.496zM2.417 2.892c0-.274.223-.496.5-.496h2.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-2v15.537h10.666v-1.983c0-.274.224-.496.5-.496s.5.222.5.495v2.48a.498.498 0 01-.5.496H2.917a.498.498 0 01-.5-.496V2.89z"
          fill="#DDD"
        />
      </svg>
    </CopyButtonContainer>
  );
}
