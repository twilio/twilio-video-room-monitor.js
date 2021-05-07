import React, { useRef } from 'react';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';
import { StatsReport } from 'twilio-video';

interface RoomStats {
  stats?: StatsReport[];
  previousStats?: StatsReport[];
}

export const RoomStatsContext = React.createContext<RoomStats>(null!);

export const RoomStatsProvider: React.FC = ({ children }) => {
  const previousStatsRef = useRef<StatsReport[]>();

  const room = useRoom();
  const stats = useGetStats(room);

  const previousStats = previousStatsRef.current;
  previousStatsRef.current = stats;

  return <RoomStatsContext.Provider value={{ stats, previousStats }}>{children}</RoomStatsContext.Provider>;
};

export default RoomStatsProvider;
