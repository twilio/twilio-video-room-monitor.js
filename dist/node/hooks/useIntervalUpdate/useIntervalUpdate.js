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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIntervalUpdate = exports.useIntervalUpdate = void 0;
const react_1 = __importStar(require("react"));
const constants_1 = require("../../constants");
// This hook will cause any component that uses it to rerender periodically. This is useful to display the real-time
// value of properties of the Room object that don't emit events when they update.
function useIntervalUpdate() {
    const [, setState] = (0, react_1.useState)(0);
    const intervalIdRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        intervalIdRef.current = window.setInterval(() => setState((count) => count + 1), constants_1.UPDATE_INTERVAL);
        return () => {
            window.clearInterval(intervalIdRef.current);
        };
    }, []);
}
exports.useIntervalUpdate = useIntervalUpdate;
// This higher-order component returns a new component that will rerender periodically.
function withIntervalUpdate(Component) {
    return (props) => {
        useIntervalUpdate();
        return react_1.default.createElement(Component, Object.assign({}, props));
    };
}
exports.withIntervalUpdate = withIntervalUpdate;
