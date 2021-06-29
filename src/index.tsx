import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';
import { roomRegistry } from './components/RoomProvider/RoomProvider';

class TwilioRoomMonitor extends EventEmitter<{
  opened: [];
  closed: [];
}> {
  // @internal
  private container?: HTMLDivElement;

  get isOpen() {
    return Boolean(this.container);
  }

  openMonitor() {
    if (!this.container) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      container.id = 'TwilioRoomMonitorContainer';
      ReactDOM.render(<App />, container);
      this.container = container;
      this.emit('opened');
    }
  }

  closeMonitor() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container!);
      this.container.remove();
      this.container = undefined;
      this.emit('closed');
    }
  }

  toggleMonitor() {
    this.isOpen ? this.closeMonitor() : this.openMonitor();
  }

  registerVideoRoom(room: Room) {
    roomRegistry.registerVideoRoom(room);
  }
}

export default new TwilioRoomMonitor();
