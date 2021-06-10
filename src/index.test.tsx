import React from 'react';
import { roomRegistry } from './components/RoomProvider/RoomProvider';
import TwilioVideoInspector from './index';

jest.mock('./App', () => () => <div>Test</div>);

describe('the Twilio Video Inspector API', () => {
  afterEach(() => TwilioVideoInspector.closeInspector());

  it('should render the app to the document when opened, and remove it when closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioVideoInspector.openInspector();
    expect(document.querySelector('div')?.textContent).toEqual('Test');

    TwilioVideoInspector.closeInspector();
    expect(document.querySelector('div')?.textContent).toEqual(undefined);
  });

  it('should not render the app when it is already open', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioVideoInspector.openInspector();
    TwilioVideoInspector.openInspector();

    expect(document.querySelectorAll('#TwilioVideoInspectorContainer').length).toEqual(1);
  });

  it('should not close the app when it is already closed', () => {
    expect(document.querySelector('div')?.textContent).toEqual(undefined);

    TwilioVideoInspector.closeInspector();

    expect(document.querySelectorAll('#TwilioVideoInspectorContainer').length).toEqual(0);
  });

  it('should emit events when opened and closed', () => {
    jest.spyOn(TwilioVideoInspector, 'emit');

    TwilioVideoInspector.openInspector();
    expect(TwilioVideoInspector.emit).toHaveBeenCalledWith('opened');

    TwilioVideoInspector.closeInspector();
    expect(TwilioVideoInspector.emit).toHaveBeenCalledWith('closed');
  });

  it('should correctly set isOpen when the inspector is opened or closed', () => {
    jest.spyOn(TwilioVideoInspector, 'emit');

    TwilioVideoInspector.openInspector();
    expect(TwilioVideoInspector.isOpen).toBe(true);

    TwilioVideoInspector.closeInspector();
    expect(TwilioVideoInspector.isOpen).toBe(false);
  });

  it('should emit events when toggled opened and closed', () => {
    jest.spyOn(TwilioVideoInspector, 'emit');

    TwilioVideoInspector.toggleInspector();
    expect(TwilioVideoInspector.emit).toHaveBeenCalledWith('opened');

    TwilioVideoInspector.toggleInspector();
    expect(TwilioVideoInspector.emit).toHaveBeenCalledWith('closed');
  });

  it('should register a room with the roomRegistry when registerVideoRoom is called', () => {
    jest.spyOn(roomRegistry, 'emit');

    TwilioVideoInspector.registerVideoRoom('mockRoom' as any);
    expect(roomRegistry.emit).toHaveBeenCalledWith('roomRegistered', 'mockRoom');
    expect(roomRegistry.room).toBe('mockRoom');
  });
});
