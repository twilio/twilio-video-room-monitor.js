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
const useParticipantIsReconnecting_1 = __importDefault(require("./useParticipantIsReconnecting"));
describe('the useParticipantIsReconnecting hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new events_1.default();
    });
    it('should return false by default', () => {
        const { result } = react_hooks_1.renderHook(() => useParticipantIsReconnecting_1.default(mockParticipant));
        expect(result.current).toBe(false);
    });
    it('should respond to "reconnecting" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => useParticipantIsReconnecting_1.default(mockParticipant));
        react_hooks_1.act(() => {
            mockParticipant.emit('reconnecting');
        });
        expect(result.current).toBe(true);
    }));
    it('should respond to "reconnected" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => useParticipantIsReconnecting_1.default(mockParticipant));
        react_hooks_1.act(() => {
            mockParticipant.emit('reconnecting');
        });
        expect(result.current).toBe(true);
        react_hooks_1.act(() => {
            mockParticipant.emit('reconnected');
        });
        expect(result.current).toBe(false);
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(() => useParticipantIsReconnecting_1.default(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('reconnecting')).toBe(0);
        expect(mockParticipant.listenerCount('reconnected')).toBe(0);
    });
});
