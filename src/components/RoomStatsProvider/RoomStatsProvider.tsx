import React, { useEffect, useRef, useState } from 'react';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';
import { StatsReport } from 'twilio-video';
import { datum } from '../../types';
import { getTotalBandwidth } from '../../hooks/useStats/useStats';
import { truncateFront } from '../../utils/utils';
import { MAX_STAT_HISTORY_LENGTH } from '../../constants';

interface RoomStats {
  stats?: StatsReport[];
  previousStats?: StatsReport[];
  receivedBytesHistory: datum[];
  sentBytesHistory: datum[];
}

export const RoomStatsContext = React.createContext<RoomStats>(null!);

export const RoomStatsProvider: React.FC = ({ children }) => {
  const previousStatsRef = useRef<StatsReport[]>();
  const [receivedBytesHistory, setReceivedBytesHistory] = useState<datum[]>([]);
  const [sentBytesHistory, setSentBytesHistory] = useState<datum[]>([]);

  const room = useRoom();
  const stats = useGetStats(room);

  const previousStats = previousStatsRef.current;
  previousStatsRef.current = stats;

  useEffect(() => {
    const totalReceivedBandwidth = getTotalBandwidth('bytesReceived', stats, previousStats);
    setReceivedBytesHistory((prevReceivedBytesHistroy) => {
      const newReceivedBytesHistroy = prevReceivedBytesHistroy.concat({ x: Date.now(), y: totalReceivedBandwidth });
      return truncateFront(newReceivedBytesHistroy, MAX_STAT_HISTORY_LENGTH);
    });

    const totalSentBandwidth = getTotalBandwidth('bytesSent', stats, previousStats);
    setSentBytesHistory((prevSentBytesHistroy) => {
      const newSentBytesHistroy = prevSentBytesHistroy.concat({ x: Date.now(), y: totalSentBandwidth });
      return truncateFront(newSentBytesHistroy, MAX_STAT_HISTORY_LENGTH);
    });
  }, [stats]);

  return (
    <RoomStatsContext.Provider value={{ stats, previousStats, receivedBytesHistory, sentBytesHistory }}>
      {children}
    </RoomStatsContext.Provider>
  );
};

export default RoomStatsProvider;
