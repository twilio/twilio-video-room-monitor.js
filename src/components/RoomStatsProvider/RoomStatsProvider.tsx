import React, { useRef } from 'react';
import { Stats } from '../../util/getStats';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';

interface RoomStats {
  stats: Stats | null;
  previousStats: Stats | null;
}

export const RoomStatsContext = React.createContext<RoomStats>({ stats: null, previousStats: null });

export const RoomStatsProvider: React.FC = ({ children }) => {
  const previousStatsRef = useRef<Stats | null>(null);

  const room = useRoom();
  const stats = useGetStats(room);

  const previousStats = previousStatsRef.current;
  previousStatsRef.current = stats;

  return <RoomStatsContext.Provider value={{ stats, previousStats }}>{children}</RoomStatsContext.Provider>;
};

export default RoomStatsProvider;
