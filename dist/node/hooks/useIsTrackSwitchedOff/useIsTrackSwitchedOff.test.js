"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const events_1 = __importDefault(require("events"));
const useIsTrackSwitchedOff_1 = __importDefault(require("./useIsTrackSwitchedOff"));
describe('the useIsTrackSwitchedOff hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new events_1.default();
    });
    it('should return false when track is undefined', () => {
        const { result } = react_hooks_1.renderHook(() => useIsTrackSwitchedOff_1.default(undefined));
        expect(result.current).toBe(false);
    });
    it('should return mockTrack.isSwitchedOff by default', () => {
        mockTrack.isSwitchedOff = true;
        const { result } = react_hooks_1.renderHook(() => useIsTrackSwitchedOff_1.default(mockTrack));
        expect(result.current).toBe(true);
    });
    it('should respond to "switchedOff" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isSwitchedOff = false;
        const { result } = react_hooks_1.renderHook(() => useIsTrackSwitchedOff_1.default(mockTrack));
        react_hooks_1.act(() => {
            mockTrack.isSwitchedOff = true;
            mockTrack.emit('switchedOff');
        });
        expect(result.current).toBe(true);
    }));
    it('should respond to "switchedOn" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockTrack.isEnabled = true;
        const { result } = react_hooks_1.renderHook(() => useIsTrackSwitchedOff_1.default(mockTrack));
        react_hooks_1.act(() => {
            mockTrack.isSwitchedOff = false;
            mockTrack.emit('switchedOn');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        mockTrack.isEnabled = 'mockTrack';
        const { unmount } = react_hooks_1.renderHook(() => useIsTrackSwitchedOff_1.default(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('switchedOff')).toBe(0);
        expect(mockTrack.listenerCount('switchedOn')).toBe(0);
    });
});
