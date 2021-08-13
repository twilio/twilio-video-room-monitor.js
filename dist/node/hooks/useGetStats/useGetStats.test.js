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
const useGetStats_1 = __importDefault(require("./useGetStats"));
const react_hooks_1 = require("@testing-library/react-hooks");
const constants_1 = require("../../constants");
const mockRoom = {
    getStats: jest.fn(() => Promise.resolve('mockStats')),
};
jest.useFakeTimers();
describe('the useGetStats hook', () => {
    it('should periodically return stats at the specified interval', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, waitForNextUpdate } = react_hooks_1.renderHook(() => useGetStats_1.default(mockRoom));
        expect(result.current).toBe(undefined);
        yield react_hooks_1.act(() => __awaiter(void 0, void 0, void 0, function* () {
            jest.runTimersToTime(constants_1.UPDATE_INTERVAL);
            yield waitForNextUpdate();
        }));
        expect(result.current).toBe('mockStats');
        yield react_hooks_1.act(() => __awaiter(void 0, void 0, void 0, function* () {
            mockRoom.getStats.mockImplementationOnce(() => Promise.resolve('mockStats2'));
            jest.runTimersToTime(constants_1.UPDATE_INTERVAL);
            yield waitForNextUpdate();
        }));
        expect(result.current).toBe('mockStats2');
    }));
    it('should call clearInterval on unmount', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(window, 'clearInterval');
        const { waitForNextUpdate, unmount } = react_hooks_1.renderHook(() => useGetStats_1.default(mockRoom));
        expect(window.clearInterval).not.toHaveBeenCalled();
        yield react_hooks_1.act(() => __awaiter(void 0, void 0, void 0, function* () {
            yield waitForNextUpdate();
        }));
        unmount();
        expect(window.clearInterval).toHaveBeenCalled();
    }));
    it('should not call setInterval when there is no room', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(window, 'setInterval');
        const { result } = react_hooks_1.renderHook(() => useGetStats_1.default());
        expect(result.current).toBe(undefined);
        expect(window.setInterval).not.toHaveBeenCalled();
    }));
});
