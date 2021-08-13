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
const useMediaStreamTrackProperties_1 = __importDefault(require("./useMediaStreamTrackProperties"));
describe('the useMediaStreamTrackProperties hook', () => {
    let mockTrack;
    const ended = new Event('ended');
    const mute = new Event('mute');
    const unmute = new Event('unmute');
    beforeEach(() => {
        mockTrack = new EventTarget();
        mockTrack.muted = 'mockMutedProp';
        mockTrack.readyState = 'mockReadyStateProp';
        mockTrack.id = 'mockIdProp';
        mockTrack.label = 'mockLabelProp';
        mockTrack.kind = 'mockKindProp';
    });
    it('should return an object where the values are undefined when the track is undefined', () => {
        const { result } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(undefined));
        expect(result.current).toStrictEqual({
            id: undefined,
            muted: undefined,
            kind: undefined,
            label: undefined,
            readyState: undefined,
        });
    });
    it('should return the initial values of the track properties by default', () => {
        const { result } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(mockTrack));
        expect(result.current).toStrictEqual({
            id: 'mockIdProp',
            muted: 'mockMutedProp',
            kind: 'mockKindProp',
            label: 'mockLabelProp',
            readyState: 'mockReadyStateProp',
        });
    });
    describe('should respond to three events', () => {
        it('the "ended" event', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(mockTrack));
            react_hooks_1.act(() => {
                mockTrack.readyState = 'anotherMockReadyStateProp';
                mockTrack.dispatchEvent(ended);
            });
            expect(result.current).toStrictEqual({
                id: 'mockIdProp',
                muted: 'mockMutedProp',
                kind: 'mockKindProp',
                label: 'mockLabelProp',
                readyState: 'anotherMockReadyStateProp',
            });
        }));
        it('the "mute" event', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(mockTrack));
            react_hooks_1.act(() => {
                mockTrack.muted = 'mockIsMutedProp';
                mockTrack.dispatchEvent(mute);
            });
            expect(result.current).toStrictEqual({
                id: 'mockIdProp',
                muted: 'mockIsMutedProp',
                kind: 'mockKindProp',
                label: 'mockLabelProp',
                readyState: 'mockReadyStateProp',
            });
        }));
        it('the "unmute" event', () => __awaiter(void 0, void 0, void 0, function* () {
            const { result } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(mockTrack));
            react_hooks_1.act(() => {
                mockTrack.muted = 'mockIsNotMutedProp';
                mockTrack.dispatchEvent(unmute);
            });
            expect(result.current).toStrictEqual({
                id: 'mockIdProp',
                muted: 'mockIsNotMutedProp',
                kind: 'mockKindProp',
                label: 'mockLabelProp',
                readyState: 'mockReadyStateProp',
            });
        }));
    });
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(() => useMediaStreamTrackProperties_1.default(mockTrack));
        const remover = jest.spyOn(mockTrack, 'removeEventListener');
        unmount();
        expect(remover).toHaveBeenCalledTimes(3);
        expect(remover).toHaveBeenNthCalledWith(1, 'mute', expect.any(Function));
        expect(remover).toHaveBeenNthCalledWith(2, 'unmute', expect.any(Function));
        expect(remover).toHaveBeenNthCalledWith(3, 'ended', expect.any(Function));
    });
});
