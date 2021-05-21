export type chartDatum = { x: number; y: number | null };

declare module 'twilio-video' {
  // This helps to create union types between Local and Remote TrackPublication
  interface LocalTrackPublication {
    publishPriority: undefined;
  }
  interface LocalVideoTrack {
    isSwitchedOff: undefined;
  }

  interface LocalAudioTrackStats {
    bytesReceived?: undefined;
  }

  interface LocalVideoTrackStats {
    bytesReceived?: undefined;
  }

  interface RemoteAudioTrackStats {
    bytesSent?: undefined;
  }

  interface RemoteVideoTrackStats {
    bytesSent?: undefined;
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
