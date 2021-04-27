import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const Triangle = styled.div<{ isOpen: boolean; isClickable: boolean }>`
  width: 0;
  height: 0;
  border-top: 5px solid ${(props) => (props.isClickable ? theme.textColor : '#555')};
  border-left: 5px solid transparent;
  transform: ${(props) => (props.isOpen ? 'rotate(135deg) translateX(-2px)' : 'rotate(45deg)')};
`;

const ChildrenContainer = styled.div`
  padding-left: 17px;
  margin-left: 4px;
  border-left: 1px solid ${theme.borderColor};
`;

const LabelContainer = styled.div<{ isClickable: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => props.isClickable && 'cursor: pointer;'}

  & > span {
    margin-left: 10px;
    font-size: ${theme.fontSizes.small};
    padding: 8px 0;
  }

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;

export const Accordion: React.FC<{ label: string }> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div>
      <LabelContainer onClick={() => hasChildren && setIsOpen((prev) => !prev)} isClickable={hasChildren}>
        <Triangle isOpen={isOpen} isClickable={hasChildren} />
        <span>{label}</span>
      </LabelContainer>
      {isOpen && <ChildrenContainer>{children}</ChildrenContainer>}
    </div>
  );
};
