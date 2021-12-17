import { CreateLocalTrackOptions, BandwidthProfileOptions, NetworkQualityConfiguration, AudioCodec, AudioCodecSettings, VideoCodec, VideoCodecSettings, LocalAudioTrack } from 'twilio-video';
export declare type chartDatum = {
    x: number;
    y: number | null;
};
export declare type Primitive = string | number | undefined | null | boolean;
export declare type Arr = (Primitive | Object)[];
declare module 'twilio-video' {
    interface LocalTrackPublication {
        publishPriority: undefined;
    }
    interface LocalVideoTrack {
        isSwitchedOff: undefined;
        priority: undefined;
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
            bandwidthProfile?: BandwidthProfileOptions;
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
