import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const Triangle = styled.div<{ isOpen: boolean }>`
  width: 0;
  height: 0;
  border-top: 5px solid ${theme.textColor};
  border-left: 5px solid transparent;
  transform: ${(props) => (props.isOpen ? 'rotate(135deg) translateX(-2px)' : 'rotate(45deg)')};
`;

const ChildrenContainer = styled.div`
  padding-left: 17px;
  margin-left: 4px;
  border-left: 1px solid #333;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  & > span {
    margin-left: 10px;
  }
`;

export const Accordion: React.FC<{ label: string }> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <LabelContainer onClick={() => setIsOpen((prev) => !prev)}>
        <Triangle isOpen={isOpen} />
        <span>{label}</span>
      </LabelContainer>
      {isOpen && <ChildrenContainer>{children}</ChildrenContainer>}
    </div>
  );
};
