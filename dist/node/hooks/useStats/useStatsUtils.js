"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTrackData = exports.getTotalBandwidth = exports.useTrackBandwidth = exports.round = exports.getActiveTrackData = exports.getTrackData = exports.getAllTracks = exports.getAllStats = void 0;
const d3_array_1 = require("d3-array");
const useStats_1 = __importDefault(require("./useStats"));
function getAllStats(statsReports) {
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
exports.getAllStats = getAllStats;
function getAllTracks(statsReports) {
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
exports.getAllTracks = getAllTracks;
function getTrackData(trackSid, statsReports) {
    const allCurrentTracks = getAllTracks(statsReports);
    return allCurrentTracks.filter((t) => t.trackSid === trackSid);
}
exports.getTrackData = getTrackData;
// Returns an array that only contains tracks that correspond to a simulcast layer
// that is currently in use. All "configured" but inactive layers will be filtered out.
function getActiveTrackData(previousStats, stats, trackSid) {
    const previousTracks = getTrackData(trackSid, previousStats);
    const currentTracks = getTrackData(trackSid, stats);
    const activeLayers = currentTracks.filter((currentTrack) => {
        const previousTrack = previousTracks.find((t) => t.ssrc === currentTrack.ssrc);
        return currentTrack.bytesSent !== (previousTrack === null || previousTrack === void 0 ? void 0 : previousTrack.bytesSent);
    });
    return activeLayers;
}
exports.getActiveTrackData = getActiveTrackData;
const round = (num) => Math.round((num + Number.EPSILON) * 10) / 10;
exports.round = round;
// Returns the bandwidth usage for a given track SID in kilobits per second.
// Returns null when track doesn't exist, or when information is not available.
function useTrackBandwidth(trackSid) {
    var _a, _b;
    const { stats, previousStats } = (0, useStats_1.default)();
    if (!stats || !previousStats)
        return null;
    const currentTrackData = getTrackData(trackSid, stats);
    const previousTrackData = getTrackData(trackSid, previousStats);
    if (currentTrackData.length === 0 || previousTrackData.length === 0) {
        return null;
    }
    const currentBytes = (0, d3_array_1.sum)(currentTrackData.map((d) => { var _a, _b; return (_b = (_a = d.bytesReceived) !== null && _a !== void 0 ? _a : d.bytesSent) !== null && _b !== void 0 ? _b : 0; }));
    const previousBytes = (0, d3_array_1.sum)(previousTrackData.map((d) => { var _a, _b; return (_b = (_a = d.bytesReceived) !== null && _a !== void 0 ? _a : d.bytesSent) !== null && _b !== void 0 ? _b : 0; }));
    const currentTime = (_a = currentTrackData[0]) === null || _a === void 0 ? void 0 : _a.timestamp;
    const previousTime = (_b = previousTrackData[0]) === null || _b === void 0 ? void 0 : _b.timestamp;
    // Calculate kilobits per second. The timestamp is in milliseconds.
    return (0, exports.round)((currentBytes - previousBytes) / (currentTime - previousTime)) * 8;
}
exports.useTrackBandwidth = useTrackBandwidth;
// Returns the bandwidth usage for all local or remote tracks in kilobits per second.
// Returns null when information is not available.
function getTotalBandwidth(kind, stats, previousStats) {
    if (!stats || !previousStats)
        return null;
    const currentTrackData = getAllTracks(stats).filter((track) => typeof track[kind] !== 'undefined');
    const previousTrackData = getAllTracks(previousStats).filter((track) => typeof track[kind] !== 'undefined');
    // Calculate the bandwidth consumption for each individual track
    const bandwidthPerTrack = currentTrackData
        .map((currentTrack) => {
        var _a, _b;
        // Find the corresponding track source from the previousTrackData array.
        const prevTrack = previousTrackData.find((t) => t.ssrc === currentTrack.ssrc);
        // If no corresponding track is found (because the track was recently published),
        // then it won't be possible to compute bandwidth usage, so null will be returned.
        if (!prevTrack)
            return null;
        const currentBytes = (_a = currentTrack[kind]) !== null && _a !== void 0 ? _a : null;
        const prevBytes = (_b = prevTrack[kind]) !== null && _b !== void 0 ? _b : null;
        if (currentBytes !== null && prevBytes !== null) {
            // Calculate kilobits per second. The timestamp is in milliseconds.
            return ((currentBytes - prevBytes) / (currentTrack.timestamp - prevTrack.timestamp)) * 8;
        }
        else {
            return null;
        }
    })
        // Remove any null values
        .filter((t) => t !== null)
        // Occasionally, the bytes sent or received can be reset to lower values, which produces negative
        // bandwidth results. Here we discard any of these negative results.
        .filter((t) => t >= 0);
    return (0, exports.round)((0, d3_array_1.sum)(bandwidthPerTrack));
}
exports.getTotalBandwidth = getTotalBandwidth;
function useTrackData(trackSid) {
    const { stats, previousStats } = (0, useStats_1.default)();
    if (!stats || !previousStats)
        return null;
    const trackData = getActiveTrackData(previousStats, stats, trackSid);
    return trackData[0];
}
exports.useTrackData = useTrackData;
