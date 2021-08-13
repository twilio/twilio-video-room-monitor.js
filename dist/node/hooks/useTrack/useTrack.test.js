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
const useTrack_1 = __importDefault(require("./useTrack"));
describe('the useTrack hook', () => {
    let mockPublication;
    beforeEach(() => {
        mockPublication = new events_1.default();
    });
    it('should return mockPublication.track by default', () => {
        mockPublication.track = 'mockTrack';
        const { result } = react_hooks_1.renderHook(() => useTrack_1.default(mockPublication));
        expect(result.current).toBe('mockTrack');
    });
    it('should respond to "subscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockPublication.track = 'mockTrack';
        const { result } = react_hooks_1.renderHook(() => useTrack_1.default(mockPublication));
        react_hooks_1.act(() => {
            mockPublication.emit('subscribed', 'newMockTrack');
        });
        expect(result.current).toBe('newMockTrack');
    }));
    it('should respond to "unsubscribed" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockPublication.track = 'mockTrack';
        const { result } = react_hooks_1.renderHook(() => useTrack_1.default(mockPublication));
        react_hooks_1.act(() => {
            mockPublication.emit('unsubscribed');
        });
        expect(result.current).toBe(null);
    }));
    it('should clean up listeners on unmount', () => {
        mockPublication.track = 'mockTrack';
        const { unmount } = react_hooks_1.renderHook(() => useTrack_1.default(mockPublication));
        unmount();
        expect(mockPublication.listenerCount('subscribed')).toBe(0);
        expect(mockPublication.listenerCount('unsubscribed')).toBe(0);
    });
});
