import React from 'react';
import { roomRegistry } from './components/RoomProvider/RoomProvider';
import RoomMonitor from './index';

jest.mock('./App', () => () => <div>Test</div>);

describe('the Twilio Video Room Monitor API', () => {
  afterEach(() => RoomMonitor.closeMonitor());

  it('should render the app to the document when opened, and remove it when closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    RoomMonitor.openMonitor();
    expect(document.querySelector('div')?.textContent).toEqual('Test');

    RoomMonitor.closeMonitor();
    expect(document.querySelector('div')?.textContent).toEqual(undefined);
  });

  it('should not render the app when it is already open', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    RoomMonitor.openMonitor();
    RoomMonitor.openMonitor();

    expect(document.querySelectorAll('#RoomMonitorContainer').length).toEqual(1);
  });

  it('should not close the app when it is already closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    RoomMonitor.closeMonitor();

    expect(document.querySelectorAll('#RoomMonitorContainer').length).toEqual(0);
  });

  it('should emit events when opened and closed', () => {
    jest.spyOn(RoomMonitor, 'emit');

    RoomMonitor.openMonitor();
    expect(RoomMonitor.emit).toHaveBeenCalledWith('opened');

    RoomMonitor.closeMonitor();
    expect(RoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should correctly set isOpen when the monitor is opened or closed', () => {
    jest.spyOn(RoomMonitor, 'emit');

    RoomMonitor.openMonitor();
    expect(RoomMonitor.isOpen).toBe(true);

    RoomMonitor.closeMonitor();
    expect(RoomMonitor.isOpen).toBe(false);
  });

  it('should emit events when toggled opened and closed', () => {
    jest.spyOn(RoomMonitor, 'emit');

    RoomMonitor.toggleMonitor();
    expect(RoomMonitor.emit).toHaveBeenCalledWith('opened');

    RoomMonitor.toggleMonitor();
    expect(RoomMonitor.emit).toHaveBeenCalledWith('closed');
  });

  it('should register a room with the roomRegistry when registerVideoRoom is called', () => {
    jest.spyOn(roomRegistry, 'emit');

    RoomMonitor.registerVideoRoom('mockRoom' as any);
    expect(roomRegistry.emit).toHaveBeenCalledWith('roomRegistered', 'mockRoom');
    expect(roomRegistry.room).toBe('mockRoom');
  });
});
