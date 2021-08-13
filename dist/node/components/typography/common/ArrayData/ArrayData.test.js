"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ArrayData_1 = __importDefault(require("./ArrayData"));
const enzyme_1 = require("enzyme");
const testArr = ['value1', 'value2', 'value3'];
describe('the ArrayData component', () => {
    describe('when the array does not contain anything', () => {
        it('should return a Datum component with a label and no value when the value is undefined', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ArrayData_1.default, { label: "mockTest", arr: undefined }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
              />
            `);
        });
        it('should return a Datum component where the value is null', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ArrayData_1.default, { label: "mockTest", arr: null }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value={null}
              />
            `);
        });
        it('should return a Datum component with the string undefined when the array has zero elements', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(ArrayData_1.default, { label: "mockTest", arr: [] }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value="undefined"
              />
            `);
        });
    });
    it('should render correctly when there is an array of objects or primitives', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(ArrayData_1.default, { label: "mockTest", arr: testArr }));
        expect(wrapper).toMatchInlineSnapshot(`
      <Accordion
        label="mockTest"
      >
        <Memo(styled.div)
          key="0"
        >
          <Memo(NestedObject)
            obj="value1"
          />
        </Memo(styled.div)>
        <Memo(styled.div)
          key="1"
        >
          <Memo(NestedObject)
            obj="value2"
          />
        </Memo(styled.div)>
        <Memo(styled.div)
          key="2"
        >
          <Memo(NestedObject)
            obj="value3"
          />
        </Memo(styled.div)>
      </Accordion>
    `);
    });
});
