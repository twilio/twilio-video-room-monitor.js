import React, { useEffect, useRef, useState } from 'react';
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
  receivedBytesHistory: chartDatum[];
  sentBytesHistory: chartDatum[];
}

export const RoomStatsContext = React.createContext<RoomStats>(null!);

export const RoomStatsProvider: React.FC = ({ children }) => {
  const previousStatsRef = useRef<StatsReport[]>();
  const receivedBytesHistoryRef = useRef<chartDatum[]>([]);
  const sentBytesHistoryRef = useRef<chartDatum[]>([]);

  const room = useRoom();
  const stats = useGetStats(room);

  const previousStats = previousStatsRef.current;
  previousStatsRef.current = stats;

  const totalReceivedBandwidth = getTotalBandwidth('bytesReceived', stats, previousStats);
  const newReceivedBytesHistroy = receivedBytesHistoryRef.current.concat({ x: Date.now(), y: totalReceivedBandwidth });
  receivedBytesHistoryRef.current = truncateFront(newReceivedBytesHistroy, MAX_STAT_HISTORY_LENGTH);

  const totalSentBandwidth = getTotalBandwidth('bytesSent', stats, previousStats);
  const newSentBytesHistroy = sentBytesHistoryRef.current.concat({ x: Date.now(), y: totalSentBandwidth });
  sentBytesHistoryRef.current = truncateFront(newSentBytesHistroy, MAX_STAT_HISTORY_LENGTH);

  return (
    <RoomStatsContext.Provider
      value={{
        stats,
        previousStats,
        receivedBytesHistory: receivedBytesHistoryRef.current,
        sentBytesHistory: sentBytesHistoryRef.current,
      }}
    >
      {children}
    </RoomStatsContext.Provider>
  );
};

export default RoomStatsProvider;
