import { useEffect, useLayoutEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { roomRegistry } from './components/RoomProvider/RoomProvider';
import { VideoRoomMonitor } from './index';

const mockAppUnmounted = jest.fn();

jest.mock('./App', () => () => {
  useEffect(() => mockAppUnmounted, []);
  return <div>Test</div>;
});

const getContainer = () => document.getElementById('TwilioVideoRoomMonitorContainer');

// Calls the API inside act so that the monitor's render or unmount has finished when it resolves.
const run = (fn: () => void) => act(async () => fn());

describe('the Twilio Video Room Monitor API', () => {
  afterEach(() => run(() => VideoRoomMonitor.closeMonitor()));

  it('should render the app to the document when opened, and remove it when closed', async () => {
    expect(getContainer()).toBeNull();

    await run(() => VideoRoomMonitor.openMonitor());
    expect(getContainer()?.textContent).toEqual('Test');

    await run(() => VideoRoomMonitor.closeMonitor());
    expect(getContainer()).toBeNull();
  });

  it('should not render the app when it is already open', async () => {
    await run(() => {
      VideoRoomMonitor.openMonitor();
      VideoRoomMonitor.openMonitor();
    });

    expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(1);
  });

  it('should not close the app when it is already closed', async () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    await run(() => VideoRoomMonitor.closeMonitor());

    expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(0);
    expect(VideoRoomMonitor.emit).not.toHaveBeenCalled();
  });

  it('should emit events when opened and closed', async () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    await run(() => VideoRoomMonitor.openMonitor());
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');

    await run(() => VideoRoomMonitor.closeMonitor());
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should set isOpen as soon as the monitor is opened or closed', async () => {
    await run(() => {
      VideoRoomMonitor.openMonitor();
      expect(VideoRoomMonitor.isOpen).toBe(true);
    });

    await run(() => {
      VideoRoomMonitor.closeMonitor();
      expect(VideoRoomMonitor.isOpen).toBe(false);
    });
  });

  it('should emit events when toggled opened and closed', async () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    await run(() => VideoRoomMonitor.toggleMonitor());
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');

    await run(() => VideoRoomMonitor.toggleMonitor());
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should emit the "opened" event after the app has been rendered', async () => {
    let contentWhenOpened: string | null | undefined;
    VideoRoomMonitor.once('opened', () => {
      contentWhenOpened = getContainer()?.textContent;
    });

    await run(() => VideoRoomMonitor.openMonitor());
    expect(contentWhenOpened).toBe('Test');
  });

  it('should emit the "closed" event after the app has been unmounted and the container removed', async () => {
    mockAppUnmounted.mockClear();
    let stateWhenClosed: { unmounted: boolean; container: HTMLElement | null } | undefined;
    VideoRoomMonitor.once('closed', () => {
      stateWhenClosed = { unmounted: mockAppUnmounted.mock.calls.length === 1, container: getContainer() };
    });

    await run(() => VideoRoomMonitor.openMonitor());
    expect(mockAppUnmounted).not.toHaveBeenCalled();

    await run(() => VideoRoomMonitor.closeMonitor());
    expect(stateWhenClosed).toEqual({ unmounted: true, container: null });
  });

  it('should only emit "closed" when the monitor is closed before it has rendered', async () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    await run(() => {
      VideoRoomMonitor.openMonitor();
      VideoRoomMonitor.closeMonitor();
    });

    expect(VideoRoomMonitor.emit).not.toHaveBeenCalledWith('opened');
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
    expect(document.body.childElementCount).toBe(0);
  });

  it('should support repeatedly opening and closing the monitor without leaking containers or logging errors', async () => {
    const consoleError = jest.spyOn(console, 'error');
    for (let i = 0; i < 5; i++) {
      await run(() => VideoRoomMonitor.toggleMonitor());
      expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toBe(1);
      expect(getContainer()?.textContent).toBe('Test');
      await run(() => VideoRoomMonitor.toggleMonitor());
      expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toBe(0);
    }
    expect(document.body.childElementCount).toBe(0);
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it.each([
    ['useEffect', useEffect],
    ['useLayoutEffect', useLayoutEffect],
  ])("should open and close without errors when called from a host component's %s", async (_, useHostEffect) => {
    const consoleError = jest.spyOn(console, 'error');
    const events: string[] = [];
    const onOpened = () => events.push(`opened: ${getContainer()?.textContent}`);
    const onClosed = () => events.push(`closed: ${getContainer() ? 'container present' : 'container removed'}`);
    VideoRoomMonitor.on('opened', onOpened).on('closed', onClosed);

    function Host() {
      useHostEffect(() => {
        VideoRoomMonitor.openMonitor();
        return () => VideoRoomMonitor.closeMonitor();
      }, []);
      return null;
    }

    const { unmount } = render(<Host />);
    await waitFor(() => expect(events).toEqual(['opened: Test']));

    unmount();
    await waitFor(() => expect(events).toEqual(['opened: Test', 'closed: container removed']));

    expect(consoleError).not.toHaveBeenCalled();
    VideoRoomMonitor.off('opened', onOpened).off('closed', onClosed);
    consoleError.mockRestore();
  });

  it('should register a room with the roomRegistry when registerVideoRoom is called', () => {
    jest.spyOn(roomRegistry, 'emit');

    VideoRoomMonitor.registerVideoRoom('mockRoom' as any);
    expect(roomRegistry.emit).toHaveBeenCalledWith('roomRegistered', 'mockRoom');
    expect(roomRegistry.room).toBe('mockRoom');
  });

  it('should not attach the VideoRoomMonitor to the window object when the PARCEL_TARGET environment variable is not set', () => {
    // Clears require cache so that we get a fresh import in this test
    jest.resetModules();

    // re-runs ./index.tsx
    require('./index');

    // @ts-ignore
    expect(window.Twilio).toBe(undefined);
  });

  describe('when the PARCEL_TARGET environment variable is "browser"', () => {
    beforeEach(() => {
      // Clears require cache so that we get a fresh import in this test
      jest.resetModules();

      process.env.PARCEL_TARGET = 'browser';
    });

    afterEach(() => {
      // Resets these values
      delete process.env.PARCEL_TARGET;
      // @ts-ignore
      delete window.Twilio;
    });

    it('should attach the VideoRoomMonitor to a new window.Twilio object when it does not already exist', () => {
      const VideoRoomMonitorImport = require('./index.tsx');

      // @ts-ignore
      expect(window.Twilio.VideoRoomMonitor).toBe(VideoRoomMonitorImport.VideoRoomMonitor);
    });

    it('should attach the VideoRoomMonitor to an existing window.Twilio object when it already exists', () => {
      // @ts-ignore
      window.Twilio = { otherTwilioModule: 'foo' };

      const VideoRoomMonitorImport = require('./index.tsx');

      // @ts-ignore
      expect(window.Twilio).toEqual({
        VideoRoomMonitor: VideoRoomMonitorImport.VideoRoomMonitor,
        otherTwilioModule: 'foo',
      });
    });
  });
});
