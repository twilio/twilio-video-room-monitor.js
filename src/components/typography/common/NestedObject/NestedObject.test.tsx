import React from 'react';
import NestedObject from './NestedObject';
import { shallow } from 'enzyme';

const testObject = { outerObject: { innerObject: 'testVal' }, primitiveValue: 'foo' };

describe('the NestedObject component', () => {
  describe('when there is no object', () => {
    it('should return a Datum component with a label when the object is undefined', () => {
      const wrapper = shallow(<NestedObject label="mockTest" obj={undefined} />);
      expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
              />
            `);
    });
    it('should return the Datum component with a null value when the object is null', () => {
      const wrapper = shallow(<NestedObject label="mockTest" obj={null} />);
      expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value={null}
              />
            `);
    });
    it('should return a Datum component for a primitive value', () => {
      const wrapper = shallow(<NestedObject label="mockTest" obj={6} />);
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
      const wrapper = shallow(<NestedObject label="mockTest" obj={testObject} />);
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
      const wrapper = shallow(<NestedObject obj={testObject} />);
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
