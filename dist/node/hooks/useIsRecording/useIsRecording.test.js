"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const events_1 = __importDefault(require("events"));
const useIsRecording_1 = __importDefault(require("./useIsRecording"));
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
jest.mock('../useRoom/useRoom');
const mockUseRoom = useRoom_1.default;
describe('the useIsRecording hook', () => {
    let mockRoom;
    beforeEach(() => {
        mockRoom = new events_1.default();
        mockRoom.isRecording = true;
        mockUseRoom.mockImplementation(() => mockRoom);
    });
    it('should return true when "room.isRecording" is true', () => {
        const { result } = react_hooks_1.renderHook(useIsRecording_1.default);
        expect(result.current).toBe(true);
    });
    it('should return false when "room.isRecording" is false', () => {
        mockRoom.isRecording = false;
        const { result } = react_hooks_1.renderHook(useIsRecording_1.default);
        expect(result.current).toBe(false);
    });
    it('should respond to "recordingStopped" events', () => {
        const { result } = react_hooks_1.renderHook(useIsRecording_1.default);
        react_hooks_1.act(() => {
            mockRoom.emit('recordingStopped');
        });
        expect(result.current).toBe(false);
    });
    it('should respond to "recordingStarted" events', () => {
        mockRoom.isRecording = false;
        const { result } = react_hooks_1.renderHook(useIsRecording_1.default);
        react_hooks_1.act(() => {
            mockRoom.emit('recordingStarted');
        });
        expect(result.current).toBe(true);
    });
    it('should not attach listeners when there is no room', () => {
        mockUseRoom.mockImplementation(() => undefined);
        react_hooks_1.renderHook(useIsRecording_1.default);
        expect(mockRoom.listenerCount('recordingStarted')).toBe(0);
        expect(mockRoom.listenerCount('recordingStopped')).toBe(0);
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(useIsRecording_1.default);
        unmount();
        expect(mockRoom.listenerCount('recordingStarted')).toBe(0);
        expect(mockRoom.listenerCount('recordingStopped')).toBe(0);
    });
});
