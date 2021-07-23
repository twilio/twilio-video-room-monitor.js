import React from 'react';
import { Accordion, LabelContainer } from './Accordion';
import { mount } from 'enzyme';

describe('the Accordion component', () => {
  describe('with children', () => {
    it('should have clickable elements', () => {
      const wrapper = mount(
        <Accordion label="test">
          <span>test span</span>
        </Accordion>
      );

      expect(wrapper.find({ isClickable: true }).length).toBe(2);
    });

    it('should toggle the display of children when clicked', () => {
      const Child = () => <span>test span</span>;
      const wrapper = mount(
        <Accordion label="test">
          <Child />
        </Accordion>
      );

      expect(wrapper.find(Child).exists()).toBe(false);
      wrapper.find(LabelContainer).simulate('click');
      expect(wrapper.find(Child).exists()).toBe(true);
      wrapper.find(LabelContainer).simulate('click');
      expect(wrapper.find(Child).exists()).toBe(false);
    });
  });

  describe('without children', () => {
    it('should not have clickable elements', () => {
      const wrapper = mount(<Accordion label="test" />);
      expect(wrapper.find({ isClickable: true }).length).toBe(0);
    });
  });
});
