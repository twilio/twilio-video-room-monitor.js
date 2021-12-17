import React from 'react';
import { chartDatum } from '../../types';
import { StatsReport } from 'twilio-video';
export interface RoomStats {
    stats?: StatsReport[];
    previousStats?: StatsReport[];
    receivedBitrateHistory: chartDatum[];
    sentBitrateHistory: chartDatum[];
    currentReceivedBitrate: number | null;
    currentSentBitrate: number | null;
}
export declare const truncateFront: (arr: any[], limit: number) => any[];
export declare const RoomStatsContext: React.Context<RoomStats>;
export declare const RoomStatsProvider: React.FC;
export default RoomStatsProvider;
