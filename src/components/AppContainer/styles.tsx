import styled from 'styled-components';
import { theme } from '../theme';

export const Container = styled.div`
  width: 500px;
  height: 85vh;
  position: fixed;
  top: 0;
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

export const BAR_HEIGHT = '25px';

export const Bar = styled.div`
  cursor: move;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20000;
`;

export const OverflowContainer = styled.div`
  overflow: hidden;
  height: 100%;
  padding-top: ${BAR_HEIGHT};
`;

export const ChildrenContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0px 10px 20px;
  background: black;
  opacity: 0.8;
`;

export const CloseIconContainer = styled.div`
  border-left: 1px solid ${theme.borderColor};
  height: 2.5em;
  width: 2.5em;
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

export const RightBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TabSelector = styled.span<{ isActive: boolean }>`
  position: relative;
  margin: 0px 6px;
  color: ${(props) => (props.isActive ? theme.textColor : '#555')};
  cursor: pointer;
  height: 37px;
  padding: 8px;
  border-bottom: ${(props) => (props.isActive ? '2px solid white' : '')};
`;
