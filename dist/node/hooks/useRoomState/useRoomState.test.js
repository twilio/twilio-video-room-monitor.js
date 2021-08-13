"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const events_1 = __importDefault(require("events"));
const useRoomState_1 = __importDefault(require("./useRoomState"));
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
jest.mock('../useRoom/useRoom');
const mockUseRoom = useRoom_1.default;
describe('the useRoomState hook', () => {
    let mockRoom;
    beforeEach(() => {
        mockRoom = new events_1.default();
        mockUseRoom.mockImplementation(() => mockRoom);
    });
    it('should return "disconnected" by default when there is no room', () => {
        mockUseRoom.mockImplementationOnce(() => undefined);
        const { result } = react_hooks_1.renderHook(useRoomState_1.default);
        expect(result.current).toBe('disconnected');
    });
    it('should return "connected" if the room state is connected', () => {
        mockRoom.state = 'connected';
        const { result } = react_hooks_1.renderHook(useRoomState_1.default);
        expect(result.current).toBe('connected');
    });
    it('should respond to the rooms "reconnecting" event', () => {
        const { result } = react_hooks_1.renderHook(useRoomState_1.default);
        react_hooks_1.act(() => {
            mockRoom.state = 'reconnecting';
            mockRoom.emit('reconnecting');
        });
        expect(result.current).toBe('reconnecting');
    });
    it('should respond to the rooms "reconnected" event', () => {
        const { result } = react_hooks_1.renderHook(useRoomState_1.default);
        react_hooks_1.act(() => {
            mockRoom.state = 'connected';
            mockRoom.emit('reconnected');
        });
        expect(result.current).toBe('connected');
    });
    it('should respond to the rooms "disconnected" event', () => {
        mockRoom.state = 'connected';
        const { result } = react_hooks_1.renderHook(useRoomState_1.default);
        expect(result.current).toBe('connected');
        react_hooks_1.act(() => {
            mockRoom.state = 'disconnected';
            mockRoom.emit('disconnected');
        });
        expect(result.current).toBe('disconnected');
    });
    it('should update when a new room object is provided', () => {
        mockUseRoom.mockImplementationOnce(() => undefined);
        const { result, rerender } = react_hooks_1.renderHook(useRoomState_1.default);
        expect(result.current).toBe('disconnected');
        react_hooks_1.act(() => {
            mockRoom = new events_1.default();
            mockRoom.state = 'connected';
            mockUseRoom.mockImplementation(() => mockRoom);
        });
        rerender();
        expect(result.current).toBe('connected');
    });
    it('tear down old listeners when receiving a new room', () => {
        const originalMockRoom = mockRoom;
        const { rerender } = react_hooks_1.renderHook(useRoomState_1.default);
        expect(originalMockRoom.listenerCount('disconnected')).toBe(1);
        expect(originalMockRoom.listenerCount('reconnected')).toBe(1);
        expect(originalMockRoom.listenerCount('reconnecting')).toBe(1);
        react_hooks_1.act(() => {
            mockRoom = new events_1.default();
            mockUseRoom.mockImplementation(() => undefined);
        });
        rerender();
        expect(originalMockRoom.listenerCount('disconnected')).toBe(0);
        expect(originalMockRoom.listenerCount('reconnected')).toBe(0);
        expect(originalMockRoom.listenerCount('reconnecting')).toBe(0);
    });
});
