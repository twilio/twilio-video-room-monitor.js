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
exports.CopyButton = exports.Tooltip = exports.CopyButtonContainer = void 0;
const cloneDeepWith_1 = __importDefault(require("lodash/cloneDeepWith"));
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const useRoom_1 = __importDefault(require("../../../hooks/useRoom/useRoom"));
const theme_1 = require("../../theme");
exports.CopyButtonContainer = styled_components_1.default.div `
  display: flex;
  position: relative;
  margin: 0 1em;
  cursor: ${({ hasRoom }) => (hasRoom ? 'pointer' : 'initial')};

  & svg {
    stroke: ${({ hasRoom }) => (hasRoom ? theme_1.theme.borderColor : '#333')};
  }
`;
exports.Tooltip = styled_components_1.default.div `
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

  ${exports.CopyButtonContainer}: hover & {
    visibility: visible;
  }

  @media (max-width: ${theme_1.theme.monitorWidth}px) {
    left: auto;
    right: 0;

    &:before {
      content: '';
      right: 5px;
      left: auto;
    }
  }
`;
const removeProcessors = (value, key) => {
    if (key === 'processor') {
        return Boolean(value);
    }
};
function CopyButton() {
    const room = (0, useRoom_1.default)();
    const [hasCopiedRoomInfo, setHasCopiedRoomInfo] = (0, react_1.useState)(false);
    const handleRoomCopy = () => {
        if (room) {
            const newRoom = (0, cloneDeepWith_1.default)(room, removeProcessors);
            const newOptions = (0, cloneDeepWith_1.default)(room._options, removeProcessors);
            const text = JSON.stringify(Object.assign(Object.assign({}, newRoom), { connectionOptions: newOptions }), null, 2);
            navigator.clipboard.writeText(text).then(() => {
                setHasCopiedRoomInfo(true);
            });
        }
    };
    return (react_1.default.createElement(exports.CopyButtonContainer, { onClick: handleRoomCopy, onMouseLeave: () => setHasCopiedRoomInfo(false), hasRoom: !!room },
        react_1.default.createElement(exports.Tooltip, null, hasCopiedRoomInfo ? 'Room information copied to clipboard' : 'Copy Room Information'),
        react_1.default.createElement("svg", { width: "20", height: "20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.917.413c0-.274.223-.496.5-.496h6.666c.133 0 .26.052.354.145l5 4.959c.093.093.146.219.146.35v11.57a.498.498 0 01-.5.496H5.417a.498.498 0 01-.5-.495V.412zm1 .495v15.538h10.666V5.576L11.876.909h-5.96z", fill: "#DDD" }),
            react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.083-.083c.276 0 .5.222.5.496v4.462h4.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-5a.498.498 0 01-.5-.496V.413c0-.274.224-.496.5-.496zM2.417 2.892c0-.274.223-.496.5-.496h2.5c.276 0 .5.222.5.496a.498.498 0 01-.5.496h-2v15.537h10.666v-1.983c0-.274.224-.496.5-.496s.5.222.5.495v2.48a.498.498 0 01-.5.496H2.917a.498.498 0 01-.5-.496V2.89z", fill: "#DDD" }))));
}
exports.CopyButton = CopyButton;
