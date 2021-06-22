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
    _options: {
      audio?: Primitive | Obj;
      automaticSubscription?: boolean;
      bandwidthProfile?: Primitive | Obj;
      dscpTagging?: boolean;
      enableDscp?: boolean;
      eventListener?: Primitive | Obj;
      iceServers?: Arr;
      iceTransportPolicy?: Primitive | Obj;
      insights?: boolean;
      maxAudioBitrate?: number | null;
      maxVideoBitrate?: number | null;
      name?: string | null;
      networkQuality?: Primitive | Obj;
      region?: string;
      preferredAudioCodecs?: Arr;
      preferredVideoCodecs?: Arr;
      logLevel?: Primitive | Obj;
      loggerName?: string;
      tracks?: Arr;
      video?: Primitive | Obj;
    };
  }
}
