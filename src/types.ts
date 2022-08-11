import {
  CreateLocalTrackOptions,
  BandwidthProfile,
  NetworkQualityConfiguration,
  AudioCodec,
  AudioCodecSettings,
  VideoCodec,
  VideoCodecSettings,
} from 'twilio-video';

export type chartDatum = { x: number; y: number | null };

export type Primitive = string | number | undefined | null | boolean;

export type Arr = (Primitive | Object)[];

declare module 'twilio-video' {
  // This helps to create union types between Local and Remote TrackPublications
  interface LocalTrackPublication {
    publishPriority: undefined;
  }

  interface LocalDataTrack {
    priority: undefined;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    switchOffReason: undefined;
    priority: undefined;
  }

  interface LocalAudioTrack {
    isSwitchedOff: undefined;
    switchOffReason: undefined;
  }

  interface LocalAudioTrackStats {
    bytesReceived?: undefined;
    packetsReceived?: undefined;
  }

  interface LocalVideoTrackStats {
    bytesReceived?: undefined;
    packetsReceived?: undefined;
  }

  interface LocalDataTrack {
    isEnabled: undefined;
    isSwitchedOff: undefined;
  }

  interface RemoteAudioTrackStats {
    bytesSent?: undefined;
    packetsSent?: undefined;
  }

  interface RemoteVideoTrackStats {
    bytesSent?: undefined;
    packetsSent?: undefined;
  }

  interface RemoteDataTrack {
    isSwitchedOff: boolean;
  }

  interface Room {
    _options: {
      audio?: boolean | CreateLocalTrackOptions;
      automaticSubscription?: boolean;
      bandwidthProfile?: BandwidthProfile;
      dscpTagging?: boolean;
      dominantSpeaker?: boolean;
      enableDscp?: boolean;
      iceServers?: RTCIceServer[];
      iceTransportPolicy?: RTCIceTransportPolicy;
      insights?: boolean;
      maxAudioBitrate?: number | null;
      maxVideoBitrate?: number | null;
      name?: string | null;
      networkQuality?: boolean | NetworkQualityConfiguration;
      region?: string;
      preferredAudioCodecs?: (AudioCodec | AudioCodecSettings)[];
      preferredVideoCodecs?: (VideoCodec | VideoCodecSettings)[];
      loggerName?: string;
      tracks?: (LocalAudioTrack | LocalVideoTrack | LocalDataTrack | MediaStreamTrack)[];
      video?: boolean | CreateLocalTrackOptions;
    };
  }
}
