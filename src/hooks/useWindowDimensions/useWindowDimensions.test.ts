import { act, renderHook } from '@testing-library/react-hooks';

import useWindowDimensions from './useWindowDimensions';

describe('the useWindowDimensions hook', () => {
  it('should return window height and width', () => {
    // @ts-ignore
    window.innerHeight = 100;
    // @ts-ignore
    window.innerWidth = 100;

    const { result } = renderHook(useWindowDimensions);
    expect(result.current).toEqual({ height: 100, width: 100 });

    act(() => {
      // @ts-ignore
      window.innerHeight = 150;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ height: 150, width: 100 });
  });

  it('should take window.visualViewport.scale into account', () => {
    // @ts-ignore
    window.innerHeight = 100;
    // @ts-ignore
    window.innerWidth = 100;

    // @ts-ignore
    window.visualViewport = {
      scale: 2,
    };

    const { result } = renderHook(useWindowDimensions);
    expect(result.current).toEqual({ height: 200, width: 200 });

    act(() => {
      // @ts-ignore
      window.innerHeight = 150;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ height: 300, width: 200 });
  });
});
