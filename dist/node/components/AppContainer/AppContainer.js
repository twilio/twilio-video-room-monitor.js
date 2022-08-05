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
const react_1 = __importStar(require("react"));
const styled_components_1 = require("styled-components");
const useDrag_1 = __importDefault(require("../../hooks/useDrag/useDrag"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const useWindowDimensions_1 = __importDefault(require("../../hooks/useWindowDimensions/useWindowDimensions"));
const CopyButton_1 = require("./CopyButton/CopyButton");
const styles_1 = require("./styles");
const index_1 = require("../../index");
const theme_1 = require("../theme");
(0, styled_components_1.createGlobalStyle) `
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
`;
function AppContainer({ children }) {
    const { draggableRef, dragContainerRef } = (0, useDrag_1.default)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('info');
    const room = (0, useRoom_1.default)();
    const { width, height } = (0, useWindowDimensions_1.default)();
    let styles = {};
    if (width < theme_1.theme.monitorWidth) {
        // For mobile devices, we have the Monitor cover the entire screen using transform: scale().
        const scale = width / theme_1.theme.monitorWidth;
        styles = {
            transform: `scale(${scale})`,
            height: height * (1 / scale) + 'px',
        };
    }
    return (react_1.default.createElement(styles_1.Container, { ref: dragContainerRef, style: styles },
        react_1.default.createElement(styles_1.Bar, { ref: draggableRef },
            react_1.default.createElement("span", { style: { padding: '0.57em' } }, "Twilio Video Room Monitor"),
            react_1.default.createElement(styles_1.RightBarContainer, null,
                react_1.default.createElement(styles_1.TabSelector, { isActive: activeTab === 'info', onClick: () => setActiveTab('info') }, "Info"),
                react_1.default.createElement(styles_1.TabSelector, { isActive: activeTab === 'stats', onClick: () => setActiveTab('stats') }, "Stats"),
                react_1.default.createElement(CopyButton_1.CopyButton, null),
                react_1.default.createElement(styles_1.CloseIconContainer, { onClick: () => index_1.VideoRoomMonitor.closeMonitor() },
                    react_1.default.createElement("svg", { width: "20", height: "20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.768 1.768a.347.347 0 01.491 0l15.973 15.973a.347.347 0 01-.492.49L1.768 2.26a.347.347 0 010-.49z", fill: "#DDD" }),
                        react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18.232 1.768a.347.347 0 010 .491L2.258 18.232a.347.347 0 11-.49-.491L17.74 1.768a.347.347 0 01.492", fill: "#DDD" }))))),
        react_1.default.createElement(styles_1.OverflowContainer, null,
            react_1.default.createElement(styles_1.ChildrenContainer, null, room ? children(activeTab) : react_1.default.createElement("span", null, "No Twilio Room detected.")))));
}
exports.default = AppContainer;
