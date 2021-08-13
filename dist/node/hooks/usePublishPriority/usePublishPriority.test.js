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
const usePublishPriority_1 = __importDefault(require("./usePublishPriority"));
describe('the usePublishPriority hook', () => {
    let mockPublication;
    beforeEach(() => {
        mockPublication = new events_1.default();
    });
    it('should return mockPublication.publishPriority by default', () => {
        mockPublication.publishPriority = 'low';
        const { result } = react_hooks_1.renderHook(() => usePublishPriority_1.default(mockPublication));
        expect(result.current).toBe('low');
    });
    it('should respond to "publishPriorityChanged" events', () => __awaiter(void 0, void 0, void 0, function* () {
        mockPublication.publishPriority = 'low';
        const { result } = react_hooks_1.renderHook(() => usePublishPriority_1.default(mockPublication));
        react_hooks_1.act(() => {
            mockPublication.emit('publishPriorityChanged', 'high');
        });
        expect(result.current).toBe('high');
    }));
    it('should clean up listeners on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(() => usePublishPriority_1.default(mockPublication));
        expect(mockPublication.listenerCount('publishPriorityChanged')).toBe(1);
        unmount();
        expect(mockPublication.listenerCount('publishPriorityChanged')).toBe(0);
    });
});
