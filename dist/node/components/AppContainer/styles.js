"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabSelector = exports.RightBarContainer = exports.CloseIconContainer = exports.ChildrenContainer = exports.OverflowContainer = exports.Bar = exports.BAR_HEIGHT = exports.Container = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../theme");
exports.Container = styled_components_1.default.div `
  width: ${theme_1.theme.monitorWidth}px;
  height: 85vh;
  position: fixed;
  top: 0;
  transform-origin: 0 0;
  z-index: 10000;
  border: 1px solid ${theme_1.theme.borderColor};
  color: ${theme_1.theme.borderColor};
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & span,
  & p,
  & text {
    font-family: 'Inter', sans-serif;
  }

  @media (max-width: ${theme_1.theme.monitorWidth}px) {
    /* !important is used here to override the style attributes used for dragging */
    top: 0 !important;
    left: 0 !important;
  }
`;
exports.BAR_HEIGHT = '2.8em';
exports.Bar = styled_components_1.default.div `
  height: ${exports.BAR_HEIGHT};
  cursor: move;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${theme_1.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20000;
`;
exports.OverflowContainer = styled_components_1.default.div `
  overflow: hidden;
  height: 100%;
  padding-top: ${exports.BAR_HEIGHT};
`;
exports.ChildrenContainer = styled_components_1.default.div `
  height: 100%;
  overflow-y: auto;
  padding: 0.4em 0.8em 0.4em;
  background: black;
  opacity: 0.8;
`;
exports.CloseIconContainer = styled_components_1.default.div `
  border-left: 1px solid ${theme_1.theme.borderColor};
  height: 2.7em;
  width: 2.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & svg {
    stroke: ${theme_1.theme.borderColor};
  }

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;
exports.RightBarContainer = styled_components_1.default.div `
  display: flex;
  align-items: center;
`;
exports.TabSelector = styled_components_1.default.span `
  position: relative;
  margin: 0px 6px;
  color: ${(props) => (props.isActive ? theme_1.theme.textColor : '#555')};
  cursor: pointer;
  padding: 8px;
  border-bottom: ${(props) => (props.isActive ? '2px solid white' : '')};
  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;
