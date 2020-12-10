import React from 'react';
import { StatsReport } from 'twilio-video';
import { RoomStatsContext } from '../../components/RoomStatsProvider/RoomStatsProvider';

export default function useStats() {
  const stats = React.useContext(RoomStatsContext);
  return stats;
}

function getAllStats(statsReports: StatsReport[]) {
  return statsReports.reduce((p, c) => {
    return {
      localAudioTrackStats: [...p.localAudioTrackStats, ...c.localAudioTrackStats],
      localVideoTrackStats: [...p.localVideoTrackStats, ...c.localVideoTrackStats],
      remoteAudioTrackStats: [...p.remoteAudioTrackStats, ...c.remoteAudioTrackStats],
      remoteVideoTrackStats: [...p.remoteVideoTrackStats, ...c.remoteVideoTrackStats],
      peerConnectionId: '',
    };
  });
}

function getAllTracks(statsReports: StatsReport[]) {
  const statsReport = getAllStats(statsReports);
  const { localAudioTrackStats, localVideoTrackStats, remoteAudioTrackStats, remoteVideoTrackStats } = statsReport;

  const allTracks = [
    ...localAudioTrackStats,
    ...localVideoTrackStats,
    ...remoteAudioTrackStats,
    ...remoteVideoTrackStats,
  ];

  return allTracks;
}

export function getTrackData(trackSid: string, statsReports: StatsReport[]) {
  const allCurrentTracks = getAllTracks(statsReports);
  return allCurrentTracks.filter((t) => t.trackSid === trackSid);
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const round = (num: number) => Math.round((num + Number.EPSILON) * 10) / 10;

export function useTrackBandwidth(trackSid: string) {
  const { stats, previousStats } = useStats();
  if (!stats || !previousStats) return null;

  const currentTrackData = getTrackData(trackSid, stats.statsReports);
  const previousTrackData = getTrackData(trackSid, previousStats.statsReports);

  if (currentTrackData.length === 0 || previousTrackData.length === 0) {
    return null;
  }

  const currentBytes = sum(currentTrackData.map((d) => d.bytesReceived ?? d.bytesSent ?? 0));
  const previousBytes = sum(previousTrackData.map((d) => d.bytesReceived ?? d.bytesSent ?? 0));

  const currentTime = currentTrackData[0]?.timestamp;
  const previousTime = previousTrackData[0]?.timestamp;

  return round((currentBytes - previousBytes) / (currentTime / previousTime) / 1000);
}

export function useTotalBandwidth(kind: 'bytesSent' | 'bytesReceived') {
  const { stats, previousStats } = useStats();
  if (!stats || !previousStats) return null;

  const currentTrackData = getAllTracks(stats.statsReports);
  const previousTrackData = getAllTracks(previousStats.statsReports);

  if (currentTrackData.length === 0 || previousTrackData.length === 0) return null;

  const currentBytes = sum(currentTrackData.map((d) => d[kind] ?? 0));
  const previousBytes = sum(previousTrackData.map((d) => d[kind] ?? 0));

  const currentTime = currentTrackData[0]?.timestamp;
  const previousTime = previousTrackData[0]?.timestamp;

  return round((currentBytes - previousBytes) / (currentTime / previousTime) / 1000);
}
