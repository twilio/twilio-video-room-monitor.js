import { StatsReport } from 'twilio-video';
import { sum } from 'd3-array';
import useStats from './useStats';

export function getAllStats(statsReports: StatsReport[]) {
  const initialValue = {
    localAudioTrackStats: [],
    localVideoTrackStats: [],
    remoteAudioTrackStats: [],
    remoteVideoTrackStats: [],
    peerConnectionId: '',
  };

  return statsReports.reduce((p, c) => {
    return {
      localAudioTrackStats: [...p.localAudioTrackStats, ...c.localAudioTrackStats],
      localVideoTrackStats: [...p.localVideoTrackStats, ...c.localVideoTrackStats],
      remoteAudioTrackStats: [...p.remoteAudioTrackStats, ...c.remoteAudioTrackStats],
      remoteVideoTrackStats: [...p.remoteVideoTrackStats, ...c.remoteVideoTrackStats],
      peerConnectionId: '',
    };
  }, initialValue);
}

export function getAllTracks(statsReports: StatsReport[]) {
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

// Returns an array that only contains tracks that correspond to a simulcast layer
// that is currently in use. All "configured" but inactive layers will be filtered out.
export function removeInactiveLayers(
  previousStats: StatsReport[] | undefined,
  stats: StatsReport[] | undefined,
  trackSid: string
) {
  if (!stats || !previousStats) return null;

  const previousTracks = getTrackData(trackSid, previousStats);
  const currentTracks = getTrackData(trackSid, stats);

  const activeLayers = currentTracks.filter((currentTrack) => {
    const previousTrack = previousTracks.find((t) => t.ssrc === currentTrack.ssrc);
    return currentTrack.bytesSent !== previousTrack?.bytesSent;
  });

  return activeLayers;
}

export const round = (num: number) => Math.round((num + Number.EPSILON) * 10) / 10;

// Returns the bandwidth usage for a given track SID in kilobytes per second.
// Returns null when track doesn't exist, or when information is not available.
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

  // Calculate kilobytes per second. The timestamp is in milliseconds.
  return round((currentBytes - previousBytes) / (currentTime - previousTime)) * 8;
}

// Returns the bandwidth usage for all local or remote tracks in kilobytes per second.
// Returns null when information is not available.
export function getTotalBandwidth(
  kind: 'bytesSent' | 'bytesReceived',
  stats: StatsReport[] | undefined,
  previousStats: StatsReport[] | undefined
) {
  if (!stats || !previousStats) return null;

  const currentTrackData = getAllTracks(stats).filter((track) => typeof track[kind] !== 'undefined');
  const previousTrackData = getAllTracks(previousStats).filter((track) => typeof track[kind] !== 'undefined');

  // Calculate the bandwidth consumption for each individual track
  const bandwidthPerTrack = (
    currentTrackData
      .map((currentTrack) => {
        // Find the corresponding track source from the previousTrackData array.
        const prevTrack = previousTrackData.find((t) => t.ssrc === currentTrack.ssrc);

        // If no corresponding track is found (because the track was recently published),
        // then it won't be possible to compute bandwidth usage, so null will be returned.
        if (!prevTrack) return null;

        const currentBytes = currentTrack[kind] ?? null;
        const prevBytes = prevTrack[kind] ?? null;

        if (currentBytes !== null && prevBytes !== null) {
          // Calculate kilobytes per second. The timestamp is in milliseconds.
          return ((currentBytes - prevBytes) / (currentTrack.timestamp - prevTrack.timestamp)) * 8;
        } else {
          return null;
        }
      })
      // Remove any null values
      .filter((t) => t !== null) as number[]
  )
    // Occasionally, the bytes sent or received can be reset to lower values, which produces negative
    // bandwidth results. Here we discard any of these negative results.
    .filter((t) => t >= 0);

  return round(sum(bandwidthPerTrack));
}

export function useTrackData(trackSid: string) {
  const { stats, previousStats } = useStats();
  if (!stats || !previousStats) return null;

  const trackData = removeInactiveLayers(previousStats, stats, trackSid);

  return trackData![0];
}
