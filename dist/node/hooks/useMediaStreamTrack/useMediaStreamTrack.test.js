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
const useMediaStreamTrack_1 = __importDefault(require("./useMediaStreamTrack"));
describe('the useMediaStreamTrack hook', () => {
    let mockTrack;
    beforeEach(() => {
        mockTrack = new events_1.default();
        mockTrack.mediaStreamTrack = 'mockMediaStreamTrack';
    });
    it('should return undefined when track is undefined', () => {
        const { result } = react_hooks_1.renderHook(() => useMediaStreamTrack_1.default(undefined));
        expect(result.current).toBe(undefined);
    });
    it('should return mockTrack.mediaStreamTrack by default', () => {
        const { result } = react_hooks_1.renderHook(() => useMediaStreamTrack_1.default(mockTrack));
        expect(result.current).toBe('mockMediaStreamTrack');
    });
    it('should respond to "started" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => useMediaStreamTrack_1.default(mockTrack));
        react_hooks_1.act(() => {
            mockTrack.mediaStreamTrack = 'anotherMockMediaStreamTrack';
            mockTrack.emit('started');
        });
        expect(result.current).toBe('anotherMockMediaStreamTrack');
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(() => useMediaStreamTrack_1.default(mockTrack));
        unmount();
        expect(mockTrack.listenerCount('started')).toBe(0);
    });
});
