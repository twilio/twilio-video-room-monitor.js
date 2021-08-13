"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const react_hooks_1 = require("@testing-library/react-hooks");
const react_1 = __importDefault(require("react"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const RoomProvider_1 = __importStar(require("./RoomProvider")), RoomProviderObj = RoomProvider_1;
const wrapper = ({ children }) => react_1.default.createElement(RoomProvider_1.default, null, children);
describe('the RoomProvider component', () => {
    afterEach(() => {
        RoomProviderObj.roomRegistry.room = undefined;
    });
    it('should return undefined by default', () => {
        const { result } = react_hooks_1.renderHook(useRoom_1.default, { wrapper });
        expect(result.current).toBe(undefined);
    });
    it('should return the room when it is registered before the RoomProvider has initialized', () => {
        RoomProviderObj.roomRegistry.registerVideoRoom('mockRoom');
        const { result } = react_hooks_1.renderHook(useRoom_1.default, { wrapper });
        expect(result.current).toBe('mockRoom');
    });
    it('should return the room when it is registered after the RoomProvider has initialized', () => {
        const { result } = react_hooks_1.renderHook(useRoom_1.default, { wrapper });
        react_hooks_1.act(() => {
            RoomProviderObj.roomRegistry.registerVideoRoom('mockRoom');
        });
        expect(result.current).toBe('mockRoom');
    });
    it('should remove listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(useRoom_1.default, { wrapper });
        expect(RoomProviderObj.roomRegistry.listenerCount('roomRegistered')).toBe(1);
        unmount();
        expect(RoomProviderObj.roomRegistry.listenerCount('roomRegistered')).toBe(0);
    });
});
