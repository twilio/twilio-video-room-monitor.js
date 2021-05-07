import { useState, useEffect } from 'react';
import { Room, StatsReport } from 'twilio-video';

export const INTERVAL = 1000;

export default function useGetStats(room?: Room) {
  const [stats, setStats] = useState<StatsReport[]>();

  useEffect(() => {
    let intervalId: number;

    if (room) {
      const getStats = () => room.getStats().then((stats) => setStats(stats));
      getStats();
      intervalId = window.setInterval(getStats, INTERVAL);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [room]);

  return stats;
}
