"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accordion = exports.LabelContainer = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../../theme");
const Triangle = styled_components_1.default.div `
  width: 0;
  height: 0;
  border-top: 5px solid ${(props) => (props.isClickable ? theme_1.theme.textColor : '#555')};
  border-left: 5px solid transparent;
  transform: ${(props) => (props.isOpen ? 'rotate(135deg) translateX(-2px)' : 'rotate(45deg)')};
`;
const ChildrenContainer = styled_components_1.default.div `
  padding-left: 17px;
  margin-left: 4px;
  border-left: 1px solid ${theme_1.theme.borderColor};
`;
exports.LabelContainer = styled_components_1.default.div `
  display: flex;
  align-items: center;
  ${(props) => props.isClickable && 'cursor: pointer;'}

  & > span {
    margin-left: 10px;
    font-size: ${theme_1.theme.fontSizes.small};
    padding: 8px 0;
  }

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`;
const Accordion = ({ children, label }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const hasChildren = react_1.default.Children.count(children) > 0;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(exports.LabelContainer, { onClick: () => hasChildren && setIsOpen((prev) => !prev), isClickable: hasChildren },
            react_1.default.createElement(Triangle, { isOpen: isOpen, isClickable: hasChildren }),
            react_1.default.createElement("span", null, label)),
        isOpen && react_1.default.createElement(ChildrenContainer, null, children)));
};
exports.Accordion = Accordion;
