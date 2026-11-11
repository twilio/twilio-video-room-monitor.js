import { act, render, renderHook, screen } from '@testing-library/react';
import { useIntervalUpdate, withIntervalUpdate } from './useIntervalUpdate';
import { UPDATE_INTERVAL } from '../../constants';

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
  it('should produce a component that updates after UPDATE_INTERVAL duration', () => {
    const BaseComponent = () => <h1>{mockObj.mockMutableValue}</h1>;
    const IntervalUpdateBaseComponent = withIntervalUpdate(BaseComponent);
    render(<IntervalUpdateBaseComponent />);

    expect(screen.getByRole('heading')).toHaveTextContent('0');

    mockObj.mockMutableValue = 1;
    act(() => {
      jest.advanceTimersByTime(UPDATE_INTERVAL);
    });

    expect(screen.getByRole('heading')).toHaveTextContent('1');
  });
});
