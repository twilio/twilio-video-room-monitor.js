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
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const useIntervalUpdate_1 = require("./useIntervalUpdate");
const test_utils_1 = require("react-dom/test-utils");
const constants_1 = require("../../constants");
const react_hooks_1 = require("@testing-library/react-hooks");
jest.useFakeTimers();
const mockObj = {
    mockMutableValue: 0,
};
describe('the useIntervalUpdate hook', () => {
    it('should call window.clearInterval on unmount', () => {
        const { unmount } = react_hooks_1.renderHook(useIntervalUpdate_1.useIntervalUpdate);
        jest.spyOn(window, 'clearInterval');
        unmount();
        expect(window.clearInterval).toHaveBeenCalledWith(expect.any(Number));
    });
});
describe('the withIntervalUpdate higher-order component', () => {
    it('should produce a component that updates after UPDATE_INTERVAL duration', () => __awaiter(void 0, void 0, void 0, function* () {
        const BaseComponent = () => react_1.default.createElement("h1", null, mockObj.mockMutableValue);
        const IntervalUpdateBaseComponent = useIntervalUpdate_1.withIntervalUpdate(BaseComponent);
        const wrapper = enzyme_1.mount(react_1.default.createElement(IntervalUpdateBaseComponent, null));
        expect(wrapper.text()).toBe('0');
        mockObj.mockMutableValue = 1;
        test_utils_1.act(() => {
            jest.runTimersToTime(constants_1.UPDATE_INTERVAL);
        });
        expect(wrapper.text()).toBe('1');
    }));
});
