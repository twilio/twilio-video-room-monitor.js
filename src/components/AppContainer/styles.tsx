import styled from 'styled-components';
import { theme } from '../theme';

export const Container = styled.div`
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

export const BAR_HEIGHT = '25px';

export const Bar = styled.div`
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

export const OverflowContainer = styled.div`
  overflow: hidden;
  height: 100%;
  padding-top: ${BAR_HEIGHT};
`;

export const ChildrenContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 0px 10px 20px;
`;

export const CloseIconContainer = styled.div`
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

export const RightBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TabSelector = styled.span<{ isActive: boolean }>`
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
