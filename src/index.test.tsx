import React from 'react';
import { roomRegistry } from './components/RoomProvider/RoomProvider';
import TwilioRoomMonitor from './index';

jest.mock('./App', () => () => <div>Test</div>);

describe('the Twilio Room Monitor API', () => {
  afterEach(() => TwilioRoomMonitor.closeMonitor());

  it('should render the app to the document when opened, and remove it when closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioRoomMonitor.openMonitor();
    expect(document.querySelector('div')?.textContent).toEqual('Test');

    TwilioRoomMonitor.closeMonitor();
    expect(document.querySelector('div')?.textContent).toEqual(undefined);
  });

  it('should not render the app when it is already open', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioRoomMonitor.openMonitor();
    TwilioRoomMonitor.openMonitor();

    expect(document.querySelectorAll('#TwilioRoomMonitorContainer').length).toEqual(1);
  });

  it('should not close the app when it is already closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioRoomMonitor.closeMonitor();

    expect(document.querySelectorAll('#TwilioRoomMonitorContainer').length).toEqual(0);
  });

  it('should emit events when opened and closed', () => {
    jest.spyOn(TwilioRoomMonitor, 'emit');

    TwilioRoomMonitor.openMonitor();
    expect(TwilioRoomMonitor.emit).toHaveBeenCalledWith('opened');

    TwilioRoomMonitor.closeMonitor();
    expect(TwilioRoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should correctly set isOpen when the monitor is opened or closed', () => {
    jest.spyOn(TwilioRoomMonitor, 'emit');

    TwilioRoomMonitor.openMonitor();
    expect(TwilioRoomMonitor.isOpen).toBe(true);

    TwilioRoomMonitor.closeMonitor();
    expect(TwilioRoomMonitor.isOpen).toBe(false);
  });

  it('should emit events when toggled opened and closed', () => {
    jest.spyOn(TwilioRoomMonitor, 'emit');

    TwilioRoomMonitor.toggleMonitor();
    expect(TwilioRoomMonitor.emit).toHaveBeenCalledWith('opened');

    TwilioRoomMonitor.toggleMonitor();
    expect(TwilioRoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should register a room with the roomRegistry when registerVideoRoom is called', () => {
    jest.spyOn(roomRegistry, 'emit');

    TwilioRoomMonitor.registerVideoRoom('mockRoom' as any);
    expect(roomRegistry.emit).toHaveBeenCalledWith('roomRegistered', 'mockRoom');
    expect(roomRegistry.room).toBe('mockRoom');
  });
});
