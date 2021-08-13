"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const useDrag_1 = __importDefault(require("./useDrag"));
// This mocks the useRef hook only, but keeps the rest of the React library the same
// as the original
jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mockUseRef = jest.fn((initialValue) => {
        if (initialValue) {
            return { current: initialValue };
        }
        else {
            return { current: document.createElement('div') };
        }
    });
    return Object.assign(Object.assign({}, originReact), { useRef: mockUseRef });
});
function triggerEvent(element, eventName, data = {}) {
    const event = new MouseEvent(eventName, data);
    return element.dispatchEvent(event);
}
describe('the useDrag hook', () => {
    it('should respond to mousemove events after a mousedown event', () => {
        const { result: { current: { draggableRef: { current: draggableEl }, dragContainerRef: { current: dragContainerEl }, }, }, } = react_hooks_1.renderHook(useDrag_1.default);
        triggerEvent(draggableEl, 'mousedown', { clientX: 10, clientY: 100 });
        triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 });
        expect(dragContainerEl.style.top).toEqual('-96px');
        expect(dragContainerEl.style.left).toEqual('-8px');
    });
    it('should not respond to mousemove events when there is no mousedown event', () => {
        const { result: { current: { dragContainerRef: { current: dragContainerEl }, }, }, } = react_hooks_1.renderHook(useDrag_1.default);
        triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 }); // This event should be ignored
        expect(dragContainerEl.style.top).toEqual('');
        expect(dragContainerEl.style.left).toEqual('');
    });
    it('should ignore mousemove events after a mouseup event', () => {
        const { result: { current: { draggableRef: { current: draggableEl }, dragContainerRef: { current: dragContainerEl }, }, }, } = react_hooks_1.renderHook(useDrag_1.default);
        triggerEvent(draggableEl, 'mousedown', { clientX: 10, clientY: 100 });
        triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 });
        expect(dragContainerEl.style.top).toEqual('-96px');
        expect(dragContainerEl.style.left).toEqual('-8px');
        triggerEvent(document.body, 'mouseup');
        triggerEvent(document.body, 'mousemove', { clientX: 200, clientY: 200 }); // This event should be ignored
        expect(dragContainerEl.style.top).toEqual('-96px');
        expect(dragContainerEl.style.left).toEqual('-8px');
    });
    it('should remove listeners on unmount', () => {
        const { result: { current: { draggableRef: { current: draggableEl }, }, }, unmount, } = react_hooks_1.renderHook(useDrag_1.default);
        jest.spyOn(draggableEl, 'removeEventListener');
        jest.spyOn(document.body, 'removeEventListener');
        unmount();
        expect(draggableEl.removeEventListener).toHaveBeenCalled();
        expect(document.body.removeEventListener).toHaveBeenCalled();
    });
});
