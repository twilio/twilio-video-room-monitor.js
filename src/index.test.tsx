import React from 'react';
import { roomRegistry } from './components/RoomProvider/RoomProvider';
import { VideoRoomMonitor } from './index';

jest.mock('./App', () => () => <div>Test</div>);

describe('the Twilio Video Room Monitor API', () => {
  afterEach(() => VideoRoomMonitor.closeMonitor());

  it('should render the app to the document when opened, and remove it when closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    VideoRoomMonitor.openMonitor();
    expect(document.querySelector('div')?.textContent).toEqual('Test');

    VideoRoomMonitor.closeMonitor();
    expect(document.querySelector('div')?.textContent).toEqual(undefined);
  });

  it('should not render the app when it is already open', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    VideoRoomMonitor.openMonitor();
    VideoRoomMonitor.openMonitor();

    expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(1);
  });

  it('should not close the app when it is already closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    VideoRoomMonitor.closeMonitor();

    expect(document.querySelectorAll('#TwilioVideoRoomMonitorContainer').length).toEqual(0);
  });

  it('should emit events when opened and closed', () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    VideoRoomMonitor.openMonitor();
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');

    VideoRoomMonitor.closeMonitor();
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should correctly set isOpen when the monitor is opened or closed', () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    VideoRoomMonitor.openMonitor();
    expect(VideoRoomMonitor.isOpen).toBe(true);

    VideoRoomMonitor.closeMonitor();
    expect(VideoRoomMonitor.isOpen).toBe(false);
  });

  it('should emit events when toggled opened and closed', () => {
    jest.spyOn(VideoRoomMonitor, 'emit');

    VideoRoomMonitor.toggleMonitor();
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('opened');

    VideoRoomMonitor.toggleMonitor();
    expect(VideoRoomMonitor.emit).toHaveBeenCalledWith('closed');
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
