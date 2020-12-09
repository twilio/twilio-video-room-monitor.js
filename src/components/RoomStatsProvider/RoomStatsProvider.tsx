import React from 'react';
import { Stats } from '../../util/getStats';
import useGetStats from '../../hooks/useGetStats/useGetStats';
import useRoom from '../../hooks/useRoom/useRoom';

export const RoomStatsContext = React.createContext<Stats | null>(null);

export const RoomStatsProvider: React.FC = ({
  children,
}) => {
  const room = useRoom();
  const stats = useGetStats(room);
  return <RoomStatsContext.Provider value={stats}>
    {children}
  </RoomStatsContext.Provider>;
};

export default RoomStatsProvider;
