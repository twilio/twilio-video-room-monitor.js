import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';

class TwilioVideoInspector extends EventEmitter {
  private container?: HTMLDivElement;
  room?: Room;

  get isOpen() {
    return Boolean(this.container);
  }

  openInspector() {
    if (!this.container) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      container.id = 'TwilioVideoInspectorContainer';
      ReactDOM.render(<App />, container);
      this.container = container;
      this.emit('opened');
    }
  }

  closeInspector() {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container!);
      this.container.remove();
      this.container = undefined;
      this.emit('closed');
    }
  }

  toggleInspector() {
    this.isOpen ? this.closeInspector() : this.openInspector();
  }

  registerTwilioRoom(room: Room) {
    this.room = room;
    this.emit('roomRegistered', room);
  }
}

export default new TwilioVideoInspector();
