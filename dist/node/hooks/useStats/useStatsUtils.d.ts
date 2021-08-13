import { StatsReport } from 'twilio-video';
export declare function getAllStats(statsReports: StatsReport[]): StatsReport;
export declare function getAllTracks(statsReports: StatsReport[]): (import("twilio-video").LocalAudioTrackStats | import("twilio-video").LocalVideoTrackStats | import("twilio-video").RemoteAudioTrackStats | import("twilio-video").RemoteVideoTrackStats)[];
export declare function getTrackData(trackSid: string, statsReports: StatsReport[]): (import("twilio-video").LocalAudioTrackStats | import("twilio-video").LocalVideoTrackStats | import("twilio-video").RemoteAudioTrackStats | import("twilio-video").RemoteVideoTrackStats)[];
export declare const round: (num: number) => number;
export declare function useTrackBandwidth(trackSid: string): number | null;
export declare function getTotalBandwidth(kind: 'bytesSent' | 'bytesReceived', stats: StatsReport[] | undefined, previousStats: StatsReport[] | undefined): number | null;
export declare function useTrackData(trackSid: string): import("twilio-video").LocalAudioTrackStats | import("twilio-video").LocalVideoTrackStats | import("twilio-video").RemoteAudioTrackStats | import("twilio-video").RemoteVideoTrackStats | null;
