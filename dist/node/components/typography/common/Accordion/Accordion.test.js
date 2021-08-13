"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Accordion_1 = require("./Accordion");
const enzyme_1 = require("enzyme");
describe('the Accordion component', () => {
    describe('with children', () => {
        it('should have clickable elements', () => {
            const wrapper = enzyme_1.mount(react_1.default.createElement(Accordion_1.Accordion, { label: "test" },
                react_1.default.createElement("span", null, "test span")));
            expect(wrapper.find({ isClickable: true }).length).toBe(2);
        });
        it('should toggle the display of children when clicked', () => {
            const Child = () => react_1.default.createElement("span", null, "test span");
            const wrapper = enzyme_1.mount(react_1.default.createElement(Accordion_1.Accordion, { label: "test" },
                react_1.default.createElement(Child, null)));
            expect(wrapper.find(Child).exists()).toBe(false);
            wrapper.find(Accordion_1.LabelContainer).simulate('click');
            expect(wrapper.find(Child).exists()).toBe(true);
            wrapper.find(Accordion_1.LabelContainer).simulate('click');
            expect(wrapper.find(Child).exists()).toBe(false);
        });
    });
    describe('without children', () => {
        it('should not have clickable elements', () => {
            const wrapper = enzyme_1.mount(react_1.default.createElement(Accordion_1.Accordion, { label: "test" }));
            expect(wrapper.find({ isClickable: true }).length).toBe(0);
        });
    });
});
