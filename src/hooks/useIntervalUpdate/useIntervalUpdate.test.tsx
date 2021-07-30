import React from 'react';
import { mount } from 'enzyme';
import { useIntervalUpdate, withIntervalUpdate } from './useIntervalUpdate';
import { act } from 'react-dom/test-utils';
import { UPDATE_INTERVAL } from '../../constants';
import { renderHook } from '@testing-library/react-hooks';

jest.useFakeTimers();

const mockObj = {
  mockMutableValue: 0,
};

describe('the useIntervalUpdate hook', () => {
  it('should call window.clearInterval on unmount', () => {
    const { unmount } = renderHook(useIntervalUpdate);
    jest.spyOn(window, 'clearInterval');
    unmount();
    expect(window.clearInterval).toHaveBeenCalledWith(expect.any(Number));
  });
});

describe('the withIntervalUpdate higher-order component', () => {
  it('should produce a component that updates after UPDATE_INTERVAL duration', async () => {
    const BaseComponent = () => <h1>{mockObj.mockMutableValue}</h1>;
    const IntervalUpdateBaseComponent = withIntervalUpdate(BaseComponent);
    const wrapper = mount(<IntervalUpdateBaseComponent />);

    expect(wrapper.text()).toBe('0');

    mockObj.mockMutableValue = 1;
    act(() => {
      jest.runTimersToTime(UPDATE_INTERVAL);
    });

    expect(wrapper.text()).toBe('1');
  });
});
