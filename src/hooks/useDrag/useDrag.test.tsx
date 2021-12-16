import { renderHook } from '@testing-library/react-hooks';
import { theme } from '../../components/theme';
import useDrag from './useDrag';

// This mocks the useRef hook only, but keeps the rest of the React library the same
// as the original
jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mockUseRef = jest.fn((initialValue: any) => {
    if (initialValue) {
      return { current: initialValue };
    } else {
      return { current: document.createElement('div') };
    }
  });
  return {
    ...originReact,
    useRef: mockUseRef,
  };
});

function triggerEvent(element: HTMLElement, eventName: string, data = {} as MouseEventInit) {
  const event = new MouseEvent(eventName, data);
  return element.dispatchEvent(event);
}

describe('the useDrag hook', () => {
  beforeEach(() => {
    // @ts-ignore
    window.innerWidth = 1000;
  });

  it('should respond to mousemove events after a mousedown event', () => {
    const {
      result: {
        current: {
          draggableRef: { current: draggableEl },
          dragContainerRef: { current: dragContainerEl },
        },
      },
    } = renderHook(useDrag);

    triggerEvent(draggableEl!, 'mousedown', { clientX: 10, clientY: 100 });
    triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 });

    expect(dragContainerEl!.style.top).toEqual('-96px');
    expect(dragContainerEl!.style.left).toEqual('-8px');
  });

  it('should not respond to mousemove events after a mousedown event when the window width is less than the container width', () => {
    //@ts-ignore
    window.innerWidth = theme.monitorWidth - 1;

    const {
      result: {
        current: {
          draggableRef: { current: draggableEl },
          dragContainerRef: { current: dragContainerEl },
        },
      },
    } = renderHook(useDrag);

    triggerEvent(draggableEl!, 'mousedown', { clientX: 10, clientY: 100 });
    triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 });

    expect(dragContainerEl!.style.top).toEqual('');
    expect(dragContainerEl!.style.left).toEqual('');
  });

  it('should not respond to mousemove events when there is no mousedown event', () => {
    const {
      result: {
        current: {
          dragContainerRef: { current: dragContainerEl },
        },
      },
    } = renderHook(useDrag);

    triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 }); // This event should be ignored

    expect(dragContainerEl!.style.top).toEqual('');
    expect(dragContainerEl!.style.left).toEqual('');
  });

  it('should ignore mousemove events after a mouseup event', () => {
    const {
      result: {
        current: {
          draggableRef: { current: draggableEl },
          dragContainerRef: { current: dragContainerEl },
        },
      },
    } = renderHook(useDrag);

    triggerEvent(draggableEl!, 'mousedown', { clientX: 10, clientY: 100 });
    triggerEvent(document.body, 'mousemove', { clientX: 2, clientY: 4 });

    expect(dragContainerEl!.style.top).toEqual('-96px');
    expect(dragContainerEl!.style.left).toEqual('-8px');

    triggerEvent(document.body, 'mouseup');
    triggerEvent(document.body, 'mousemove', { clientX: 200, clientY: 200 }); // This event should be ignored

    expect(dragContainerEl!.style.top).toEqual('-96px');
    expect(dragContainerEl!.style.left).toEqual('-8px');
  });

  it('should remove listeners on unmount', () => {
    const {
      result: {
        current: {
          draggableRef: { current: draggableEl },
        },
      },
      unmount,
    } = renderHook(useDrag);

    jest.spyOn(draggableEl!, 'removeEventListener');
    jest.spyOn(document.body, 'removeEventListener');

    unmount();

    expect(draggableEl!.removeEventListener).toHaveBeenCalled();
    expect(document.body.removeEventListener).toHaveBeenCalled();
  });
});
