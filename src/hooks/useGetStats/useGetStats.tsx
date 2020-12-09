import React from 'react';
import { Room } from 'twilio-video';
import { GetStatsEvent, GetStatsUtil, Stats } from '../../util/getStats';

const getStatsUtil = new GetStatsUtil();
getStatsUtil.start();

export default function useGetStats(room?: Room) {
  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    if (!room) { return; }

    const eventListener = (event: Event) => {
      if (event instanceof GetStatsEvent && event.room === room) {
        setStats(event.stats);
      }
    };

    getStatsUtil.addEventListener(GetStatsEvent.type, eventListener);

    getStatsUtil.getStats(room);

    return () => {
      getStatsUtil.removeEventListener(GetStatsEvent.type, eventListener);
    };
  }, [room]);

  return stats;
}
