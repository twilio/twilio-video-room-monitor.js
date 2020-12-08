import { Room, StatsReport } from 'twilio-video';

export interface Stats {
  statsReports: StatsReport[];
  timestamp: number;
}

export class GetStatsEvent extends Event {
  static type = 'getStats' as const;

  room: Room;
  stats: Stats;

  constructor(room: Room, stats: Stats) {
    super('getStats');

    this.room = room;
    this.stats = stats;

    Object.setPrototypeOf(this, GetStatsEvent);
  }
}

export class GetStatsUtil extends EventTarget {
  rooms: Map<Room, Stats> = new Map();
  pollIntervalId: number | undefined;

  start(interval: number = 1000): void {
    this.pollIntervalId = setInterval(() => {
      for (const room of this.rooms.keys()) {
        this.updateStats(room);
      }
    }, interval);
  }

  stop(): void {
    clearInterval(this.pollIntervalId);
  }

  async getStats(
    room: Room,
    recency: number = 1000,
    timestamp: number = Date.now(),
  ): Promise<Stats> {
    const recentStats = this.rooms.get(room);

    if (!recentStats) {
      return this.updateStats(room);
    }

    const r = timestamp - recentStats.timestamp;

    if (recentStats && r > 0 && r < recency) {
      return recentStats;
    }

    return this.updateStats(room);
  }

  async updateStats(room: Room): Promise<Stats> {
    const statsReports = await room.getStats();

    const stats = { statsReports, timestamp: Date.now() };

    this.rooms.set(room, stats);

    this.dispatchEvent(new GetStatsEvent(room, stats));

    return stats;
  }
}
