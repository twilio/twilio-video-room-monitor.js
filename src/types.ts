import * as Video from 'twilio-video';

declare module 'twilio-video' {
  interface LocalTrackPublication {
    priority: Track.Priority;
    publishPriority: undefined;
  }

  interface RemoteTrackPublication {
    publishPriority: Track.Priority;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
  }

  interface RemoteVideoTrack {
    isSwitchedOff: boolean;
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
}
