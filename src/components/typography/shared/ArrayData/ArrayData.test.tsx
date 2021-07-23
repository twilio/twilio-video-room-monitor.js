import React from 'react';
import ArrayData from './ArrayData';
import { shallow } from 'enzyme';
import { Arr } from '../../../../types';

const testArr: Arr = ['value1', 'value2', 'value3'];

describe('the ArrayData component', () => {
  describe('when the array does not contain anything', () => {
    it('should return a Datum component with a label and no value when the value is undefined', () => {
      const wrapper = shallow(<ArrayData label="mockTest" arr={undefined} />);
      expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
              />
            `);
    });
    it('should return a Datum component where the value is null', () => {
      const wrapper = shallow(<ArrayData label="mockTest" arr={null} />);
      expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value={null}
              />
            `);
    });
    it('should return a Datum component with the string undefined when the array has zero elements', () => {
      const wrapper = shallow(<ArrayData label="mockTest" arr={[]} />);
      expect(wrapper).toMatchInlineSnapshot(`
              <Memo(Datum)
                label="mockTest"
                value="undefined"
              />
            `);
    });
  });

  it('should render correctly when there is an array of objects or primitives', () => {
    const wrapper = shallow(<ArrayData label="mockTest" arr={testArr} />);
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
