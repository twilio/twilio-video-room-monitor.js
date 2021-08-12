import _ from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';
import useRoom from '../../../hooks/useRoom/useRoom';
import { theme } from '../../theme';

export const CopyButtonContainer = styled.div<{ hasRoom: boolean }>`
  display: flex;
  position: relative;
  margin: 0 1em;
  cursor: ${({ hasRoom }) => (hasRoom ? 'pointer' : 'initial')};

  & svg {
    stroke: ${({ hasRoom }) => (hasRoom ? theme.borderColor : '#333')};
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background: #4f4f4f;
  font-size: 0.75rem;
  white-space: nowrap;
  padding: 0.2em 0.6em;
  top: 2.7em;
  left: 0%;
  visibility: hidden;

  &:before {
    content: '';
    width: 0;
    height: 0;
    left: 5px;
    top: -5px;
    position: absolute;
    border: 5px solid #4f4f4f;
    transform: rotate(135deg);
  }

  ${CopyButtonContainer}: hover & {
    visibility: visible;
  }
`;

const removeProcessors = (value: any, key: any) => {
  if (key === 'processor') {
    return Boolean(value);
  }
};

export function CopyButton() {
  const room = useRoom();
  const [hasCopiedRoomInfo, setHasCopiedRoomInfo] = useState(false);

  const handleRoomCopy = () => {
    if (room) {
      const newRoom = _.cloneDeepWith(room, removeProcessors);
      const newOptions = _.cloneDeepWith(room._options, removeProcessors);
      const text = JSON.stringify({ ...newRoom, connectionOptions: newOptions }, null, 2);
      navigator.clipboard.writeText(text).then(() => {
        setHasCopiedRoomInfo(true);
      });
    }
  };

  return (
    <CopyButtonContainer onClick={handleRoomCopy} onMouseLeave={() => setHasCopiedRoomInfo(false)} hasRoom={!!room}>
      <Tooltip>{hasCopiedRoomInfo ? 'Room information copied to clipboard' : 'Copy Room Information'}</Tooltip>

      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.917.413c0-.274.223-.496.5-.496h6.666c.133 0 .26.052.354.145l5 4.959c.093.093.146.219.146.35v11.57a.498.498 0 01-.5.496H5.417a.498.498 0 01-.5-.495V.412zm1 .495v15.538h10.666V5.576L11.876.909h-5.96z"
          fill="#DDD"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.083-.083c.276 0 .5.222.5.496v4.462h4.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-5a.498.498 0 01-.5-.496V.413c0-.274.224-.496.5-.496zM2.417 2.892c0-.274.223-.496.5-.496h2.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-2v15.537h10.666v-1.983c0-.274.224-.496.5-.496s.5.222.5.495v2.48a.498.498 0 01-.5.496H2.917a.498.498 0 01-.5-.496V2.89z"
          fill="#DDD"
        />
      </svg>
    </CopyButtonContainer>
  );
}
