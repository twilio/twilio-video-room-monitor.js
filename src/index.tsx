import { useLayoutEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import EventEmitter from 'eventemitter3';
import { Room } from 'twilio-video';
import { roomRegistry } from './components/RoomProvider/RoomProvider';

// Renders the app and calls onCommit once it has been committed to the DOM.
function MonitorRoot({ onCommit }: { onCommit: () => void }) {
  useLayoutEffect(onCommit, [onCommit]);
  return <App />;
}

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
      this.container = container;
      this.root = root;
      // createRoot renders asynchronously, so 'opened' is emitted once the app is in the DOM. flushSync isn't used
      // because React ignores it, with a warning, when openMonitor is called from a host app's effect.
      const onCommit = () => {
        if (this.root === root) this.emit('opened');
      };
      root.render(<MonitorRoot onCommit={onCommit} />);
    }
  }

  closeMonitor() {
    const { container, root } = this;
    if (container && root) {
      this.container = undefined;
      this.root = undefined;
      // Unmounting while React is rendering logs a warning, which happens when closeMonitor is called from a host
      // app's effect cleanup. Deferring to a microtask avoids that, and 'closed' is emitted once the app is unmounted.
      queueMicrotask(() => {
        root.unmount();
        container.remove();
        this.emit('closed');
      });
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
