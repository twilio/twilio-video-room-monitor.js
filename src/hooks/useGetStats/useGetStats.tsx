import { useState, useEffect } from 'react';
import { Room, StatsReport } from 'twilio-video';

export default function useGetStats(room?: Room) {
  const [stats, setStats] = useState<StatsReport[]>();

  useEffect(() => {
    let intervalId: number;

    if (room) {
      const getStats = () => room.getStats().then((stats) => setStats(stats));
      getStats();
      intervalId = window.setInterval(getStats, 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [room]);

  return stats;
}
