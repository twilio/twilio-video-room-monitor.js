"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NestedObject_1 = __importDefault(require("./NestedObject"));
const enzyme_1 = require("enzyme");
const testObject = { outerObject: { innerObject: 'testVal' }, primitiveValue: 'foo' };
describe('the NestedObject component', () => {
    describe('when there is no object', () => {
        it('should return a Datum component with a label when the object is undefined', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(NestedObject_1.default, { label: "mockTest", obj: undefined }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
              />
            `);
        });
        it('should return the Datum component with a null value when the object is null', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(NestedObject_1.default, { label: "mockTest", obj: null }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value={null}
              />
            `);
        });
        it('should return a Datum component for a primitive value', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(NestedObject_1.default, { label: "mockTest", obj: 6 }));
            expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value={6}
              />
            `);
        });
    });
    describe('when there is a object', () => {
        it('should return an object in an Accordion component when there is a label', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(NestedObject_1.default, { label: "mockTest", obj: testObject }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Accordion
          label="mockTest"
        >
          <NestedObject
            key="0"
            label="outerObject"
            obj={
              Object {
                "innerObject": "testVal",
              }
            }
          />
          <Memo(Datum)
            key="1"
            label="primitiveValue"
            value="foo"
          />
        </Accordion>
      `);
        });
        it('should return a container when there is no label', () => {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(NestedObject_1.default, { obj: testObject }));
            expect(wrapper).toMatchInlineSnapshot(`
        <Memo(styled.div)>
          <NestedObject
            key="0"
            label="outerObject"
            obj={
              Object {
                "innerObject": "testVal",
              }
            }
          />
          <Memo(Datum)
            key="1"
            label="primitiveValue"
            value="foo"
          />
        </Memo(styled.div)>
      `);
        });
    });
});
