import React from 'react';
import { StatsReport } from 'twilio-video';
import { RoomStatsContext } from '../../components/RoomStatsProvider/RoomStatsProvider';

export function useStats() {
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

  const currentTrackData = getTrackData(trackSid, stats);
  const previousTrackData = getTrackData(trackSid, previousStats);

  if (currentTrackData.length === 0 || previousTrackData.length === 0) {
    return null;
  }

  const currentBytes = sum(currentTrackData.map((d) => d.bytesReceived ?? d.bytesSent ?? 0));
  const previousBytes = sum(previousTrackData.map((d) => d.bytesReceived ?? d.bytesSent ?? 0));

  const currentTime = currentTrackData[0]?.timestamp;
  const previousTime = previousTrackData[0]?.timestamp;

  return round((currentBytes - previousBytes) / (currentTime - previousTime)) * 8;
}

export function getTotalBandwidth(
  kind: 'bytesSent' | 'bytesReceived',
  stats: StatsReport[] | undefined,
  previousStats: StatsReport[] | undefined
) {
  if (!stats || !previousStats) return null;

  const currentTrackData = getAllTracks(stats).filter((track) => typeof track[kind] !== 'undefined');
  const previousTrackData = getAllTracks(previousStats).filter((track) => typeof track[kind] !== 'undefined');

  // Calculate the bandwidth consumption for each individual track
  const bandwidthPerTrack = currentTrackData
    .map((currentTrack) => {
      // Find the corresponding track source from the previousTrackData array.
      const prevTrack = previousTrackData.find((t) => t.ssrc === currentTrack.ssrc);

      // If no corresponding track is found (because the track was recently published),
      // then it won't be possible to compute bandwidth usage, so null will be returned.
      if (!prevTrack) return null;

      const currentBytes = currentTrack[kind] ?? null;
      const prevBytes = prevTrack[kind] ?? null;

      if (currentBytes !== null && prevBytes !== null) {
        // Calulate bytes per second
        return ((currentBytes - prevBytes) / (currentTrack.timestamp - prevTrack.timestamp)) * 8;
      } else {
        return null;
      }
    })
    // Remove and null values
    .filter((t) => t !== null) as number[];

  return round(sum(bandwidthPerTrack));
}

export function useTrackData(trackSid: string) {
  const { stats, previousStats } = useStats();
  if (!stats || !previousStats) return null;

  const trackData = getTrackData(trackSid, stats);

  return trackData[0];
}
