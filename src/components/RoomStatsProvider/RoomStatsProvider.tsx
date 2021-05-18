import React, { useRef } from 'react';
import { chartDatum } from '../../types';
import { getTotalBandwidth } from '../../hooks/useStats/useStats';
import { MAX_STAT_HISTORY_LENGTH } from '../../constants';
import { StatsReport } from 'twilio-video';
import { truncateFront } from '../../utils/utils';
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
  const newReceivedBytesHistroy = receivedBitrateHistoryRef.current.concat({
    x: Date.now(),
    y: totalReceivedBitrate,
  });
  receivedBitrateHistoryRef.current = truncateFront(newReceivedBytesHistroy, MAX_STAT_HISTORY_LENGTH);

  const totalSentBitrate = getTotalBandwidth('bytesSent', stats, previousStats);
  const newSentBytesHistroy = sentBitrateHistoryRef.current.concat({ x: Date.now(), y: totalSentBitrate });
  sentBitrateHistoryRef.current = truncateFront(newSentBytesHistroy, MAX_STAT_HISTORY_LENGTH);

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
