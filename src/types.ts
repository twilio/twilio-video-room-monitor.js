import * as Video from 'twilio-video';

declare module 'twilio-video' {
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
  }

  interface LocalAudioTrackStats {
    bytesReceived: undefined;
  }

  interface LocalVideoTrackStats {
    bytesReceived: undefined;
  }

  interface RemoteAudioTrackStats {
    bytesSent: undefined;
  }

  interface RemoteVideoTrackStats {
    bytesSent: undefined;
  }

  interface Room {
    _options: object;
  }
}

declare global {
  interface Window {
    TwilioVideoInspector: {
      destroy: () => void;
    };
  }
}
