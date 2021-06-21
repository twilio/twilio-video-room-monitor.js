export type chartDatum = { x: number; y: number | null };

export type Primitive = string | number | undefined | null | boolean;

export type Arr = (Primitive | Obj)[];

export interface Obj {
  [key: string]: Primitive | Obj | Arr;
}

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
    packetsReceived?: undefined;
  }

  interface LocalVideoTrackStats {
    bytesReceived?: undefined;
    packetsReceived?: undefined;
  }

  interface RemoteAudioTrackStats {
    bytesSent?: undefined;
    packetsSent?: undefined;
  }

  interface RemoteVideoTrackStats {
    bytesSent?: undefined;
    packetsSent?: undefined;
  }

  interface Room {
    _options: Record<string, unknown>;
  }
}
