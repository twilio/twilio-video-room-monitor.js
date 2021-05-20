import React from 'react';
import { RoomStatsContext } from '../../components/RoomStatsProvider/RoomStatsProvider';

export function useStats() {
  const stats = React.useContext(RoomStatsContext);
  return stats;
}
