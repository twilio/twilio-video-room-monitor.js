import { flushSync } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';
import { roomRegistry } from './components/RoomProvider/RoomProvider';

class VideoRoomMonitorImpl extends EventEmitter<{
  opened: [];
  closed: [];
}> {
  // @internal
  private container?: HTMLDivElement;
  // @internal
  private root?: Root;

  get isOpen() {
    return Boolean(this.container);
  }

  openMonitor() {
    if (!this.container) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      container.id = 'TwilioVideoRoomMonitorContainer';
      const root = createRoot(container);
      // Render synchronously, as ReactDOM.render did, so the monitor is in the DOM before 'opened' is emitted.
      flushSync(() => root.render(<App />));
      this.container = container;
      this.root = root;
      this.emit('opened');
    }
  }

  closeMonitor() {
    if (this.container) {
      this.root?.unmount();
      this.container.remove();
      this.container = undefined;
      this.root = undefined;
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

export const VideoRoomMonitor = new VideoRoomMonitorImpl();

// Add API to window variable when the parcel target is browser
if (process.env.PARCEL_TARGET === 'browser') {
  // @ts-ignore
  window.Twilio = window.Twilio || {};
  // @ts-ignore
  window.Twilio.VideoRoomMonitor = VideoRoomMonitor;
}
