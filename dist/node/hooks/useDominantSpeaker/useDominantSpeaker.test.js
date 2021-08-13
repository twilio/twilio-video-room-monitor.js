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
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
const useDominantSpeaker_1 = __importDefault(require("./useDominantSpeaker"));
jest.mock('../useRoom/useRoom');
const mockUseRoom = useRoom_1.default;
describe('the useDominantSpeaker hook', () => {
    let mockRoom;
    beforeEach(() => {
        mockRoom = new events_1.default();
        mockUseRoom.mockImplementation(() => mockRoom);
    });
    it('should return mockRoom.dominantSpeaker by default', () => {
        mockRoom.dominantSpeaker = 'test-participant';
        const { result } = react_hooks_1.renderHook(useDominantSpeaker_1.default);
        expect(result.current).toBe('test-participant');
    });
    it('should respond to "dominantSpeakerChanged" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockRoom.dominantSpeaker = 'test-participant';
        const { result } = react_hooks_1.renderHook(useDominantSpeaker_1.default);
        react_hooks_1.act(() => {
            mockRoom.emit('dominantSpeakerChanged', 'test-participant2');
        });
        expect(result.current).toBe('test-participant2');
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(useDominantSpeaker_1.default);
        expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(1);
        unmount();
        expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(0);
    });
    it('should not attach listeners when there is no room', () => {
        mockUseRoom.mockImplementationOnce(() => undefined);
        react_hooks_1.renderHook(useDominantSpeaker_1.default);
        expect(mockRoom.listenerCount('dominantSpeakerChanged')).toBe(0);
    });
});
