import React from 'react';
import { Stats } from '../../util/getStats';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';

export const StatsContext = React.createContext<Stats | null>(null);

export const RoomStatsProvider: React.FC = ({
  children,
}) => {
  const room = useRoom();
  const stats = useGetStats(room);
  return <StatsContext.Provider value={stats}>
    {children}
  </StatsContext.Provider>;
};

export default RoomStatsProvider;
