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
const usePublications_1 = __importDefault(require("./usePublications"));
const events_1 = __importDefault(require("events"));
const constants_1 = require("../../constants");
jest.useFakeTimers();
describe('the usePublications hook', () => {
    let mockParticipant;
    beforeEach(() => {
        mockParticipant = new events_1.default();
        mockParticipant.tracks = new Map([
            [0, { trackSid: 'track1' }],
            [1, { trackSid: 'track2' }],
        ]);
    });
    it('should return an array of mockParticipant.tracks by default', () => {
        const { result } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant));
        expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
    });
    it('should respond to "trackPublished" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant));
        react_hooks_1.act(() => {
            mockParticipant.emit('trackPublished', { trackSid: 'newMockTrack' });
        });
        expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }, { trackSid: 'newMockTrack' }]);
    }));
    it('should respond to "trackUnpublished" events', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant));
        react_hooks_1.act(() => {
            mockParticipant.emit('trackUnpublished', mockParticipant.tracks.get(0));
        });
        expect(result.current).toEqual([{ trackSid: 'track2' }]);
    }));
    it('should return a new set of tracks if the participant changes', () => {
        const { result, rerender } = react_hooks_1.renderHook(({ participant }) => usePublications_1.default(participant), {
            initialProps: { participant: mockParticipant },
        });
        expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
        mockParticipant = new events_1.default();
        mockParticipant.tracks = new Map([
            [0, { trackSid: 'track3' }],
            [1, { trackSid: 'track4' }],
        ]);
        rerender({ participant: mockParticipant });
        expect(result.current).toEqual([{ trackSid: 'track3' }, { trackSid: 'track4' }]);
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant));
        unmount();
        expect(mockParticipant.listenerCount('trackPublished')).toBe(0);
        expect(mockParticipant.listenerCount('trackUnpublished')).toBe(0);
    });
    describe('when isLocal is true', () => {
        it('should periodically update the conversations array when it changes', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant, true));
            expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
            mockParticipant.tracks.set(2, { trackSid: 'track3' });
            react_hooks_1.act(() => {
                jest.runTimersToTime(constants_1.UPDATE_INTERVAL);
            });
            expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }, { trackSid: 'track3' }]);
        }));
        it('should not periodically update the conversations array when it changes, but trackSids stay the same', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = react_hooks_1.renderHook(() => usePublications_1.default(mockParticipant, true));
            expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
            mockParticipant.tracks = new Map([
                [0, { trackSid: 'track2' }],
                [1, { trackSid: 'track1' }],
            ]);
            react_hooks_1.act(() => {
                jest.runTimersToTime(constants_1.UPDATE_INTERVAL);
            });
            expect(result.current).toEqual([{ trackSid: 'track1' }, { trackSid: 'track2' }]);
        }));
        it('should clear the setInterval ID when the participant changes', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(window, 'clearInterval');
            const { rerender } = react_hooks_1.renderHook(({ participant, isLocal }) => usePublications_1.default(participant, isLocal), {
                initialProps: { participant: mockParticipant, isLocal: true },
            });
            mockParticipant = new events_1.default();
            mockParticipant.tracks = new Map();
            rerender({ participant: mockParticipant, isLocal: true });
            expect(window.clearInterval).toHaveBeenCalledWith(expect.any(Number));
        }));
    });
});
