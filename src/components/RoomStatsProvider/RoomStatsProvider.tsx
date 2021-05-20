import React, { useRef } from 'react';
import { chartDatum } from '../../types';
import { getTotalBandwidth } from '../../hooks/useStats/useStats';
import { MAX_STAT_HISTORY_LENGTH } from '../../constants';
import { StatsReport } from 'twilio-video';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';

interface RoomStats {
  stats?: StatsReport[];
  previousStats?: StatsReport[];
  receivedBitrateHistory: chartDatum[];
  sentBitrateHistory: chartDatum[];
  currentReceivedBitrate: number | null;
  currentSentBitrate: number | null;
}

export const truncateFront = (arr: any[], limit: number) => arr.slice(Math.max(0, arr.length - limit), arr.length);

export const RoomStatsContext = React.createContext<RoomStats>(null!);

export const RoomStatsProvider: React.FC = ({ children }) => {
  const previousStatsRef = useRef<StatsReport[]>();
  const receivedBitrateHistoryRef = useRef<chartDatum[]>([]);
  const sentBitrateHistoryRef = useRef<chartDatum[]>([]);

  const room = useRoom();
  const stats = useGetStats(room);

  const previousStats = previousStatsRef.current;
  previousStatsRef.current = stats;

  const totalReceivedBitrate = getTotalBandwidth('bytesReceived', stats, previousStats);
  const newReceivedBytesHistory = receivedBitrateHistoryRef.current.concat({
    x: Date.now(),
    y: totalReceivedBitrate,
  });
  receivedBitrateHistoryRef.current = truncateFront(newReceivedBytesHistory, MAX_STAT_HISTORY_LENGTH);

  const totalSentBitrate = getTotalBandwidth('bytesSent', stats, previousStats);
  const newSentBytesHistory = sentBitrateHistoryRef.current.concat({ x: Date.now(), y: totalSentBitrate });
  sentBitrateHistoryRef.current = truncateFront(newSentBytesHistory, MAX_STAT_HISTORY_LENGTH);

  return (
    <RoomStatsContext.Provider
      value={{
        stats,
        previousStats,
        receivedBitrateHistory: receivedBitrateHistoryRef.current,
        sentBitrateHistory: sentBitrateHistoryRef.current,
        currentReceivedBitrate: receivedBitrateHistoryRef.current.slice(-1)[0]?.y,
        currentSentBitrate: sentBitrateHistoryRef.current.slice(-1)[0]?.y,
      }}
    >
      {children}
    </RoomStatsContext.Provider>
  );
};

export default RoomStatsProvider;
