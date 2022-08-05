"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTrackPublicationInfo = exports.VideoTrackInfo = void 0;
const react_1 = __importDefault(require("react"));
const Datum_1 = __importDefault(require("../../typography/common/Datum/Datum"));
const MediaStreamTrackInfo_1 = __importDefault(require("../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo"));
const StatsContainer_1 = __importDefault(require("../../typography/common/StatsContainer/StatsContainer"));
const useIsTrackEnabled_1 = __importDefault(require("../../../hooks/useIsTrackEnabled/useIsTrackEnabled"));
const useIsTrackSwitchedOff_1 = __importDefault(require("../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff"));
const useMediaStreamTrack_1 = __importDefault(require("../../../hooks/useMediaStreamTrack/useMediaStreamTrack"));
const usePublishPriority_1 = __importDefault(require("../../../hooks/usePublishPriority/usePublishPriority"));
const useStatsUtils_1 = require("../../../hooks/useStats/useStatsUtils");
const useTrack_1 = __importDefault(require("../../../hooks/useTrack/useTrack"));
const useVideoTrackDimensions_1 = __importDefault(require("../../../hooks/useVideoTrackDimensions/useVideoTrackDimensions"));
const useIntervalUpdate_1 = require("../../../hooks/useIntervalUpdate/useIntervalUpdate");
const getDimensionString = (dimensions) => dimensions ? `${dimensions.width} x ${dimensions.height}` : 'undefined';
const IntervalUpdateDatum = (0, useIntervalUpdate_1.withIntervalUpdate)(Datum_1.default);
const VideoTrackInfo = ({ track, trackSid }) => {
    const dimensions = (0, useVideoTrackDimensions_1.default)(track);
    const isSwitchedOff = (0, useIsTrackSwitchedOff_1.default)(track);
    const isEnabled = (0, useIsTrackEnabled_1.default)(track);
    const trackBandwidth = (0, useStatsUtils_1.useTrackBandwidth)(trackSid);
    const trackData = (0, useStatsUtils_1.useTrackData)(trackSid);
    const mediaStreamTrack = (0, useMediaStreamTrack_1.default)(track);
    let lossPercentage = '';
    if (trackData) {
        const { packetsReceived, packetsSent, packetsLost } = trackData;
        const totalPackets = packetsReceived !== null && packetsReceived !== void 0 ? packetsReceived : packetsSent;
        lossPercentage =
            totalPackets && packetsLost !== null ? `${((packetsLost / totalPackets) * 100).toLocaleString()}%` : null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Datum_1.default, { label: "Dimensions", value: getDimensionString(dimensions) }),
        isSwitchedOff !== undefined && react_1.default.createElement(Datum_1.default, { label: "isSwitchedOff", value: isSwitchedOff }),
        react_1.default.createElement(Datum_1.default, { label: "isEnabled", value: isEnabled }),
        react_1.default.createElement(Datum_1.default, { label: "Bandwidth", value: (trackBandwidth === null || trackBandwidth === void 0 ? void 0 : trackBandwidth.toLocaleString()) + 'kbps' }),
        track.priority !== undefined && react_1.default.createElement(IntervalUpdateDatum, { label: "subscribePriority", value: track.priority }),
        trackData && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Datum_1.default, { label: "Codec", value: trackData.codec }),
            react_1.default.createElement(Datum_1.default, { label: "Framerate", value: trackData === null || trackData === void 0 ? void 0 : trackData.frameRate }),
            react_1.default.createElement(Datum_1.default, { label: "Packets Lost", value: trackData === null || trackData === void 0 ? void 0 : trackData.packetsLost }),
            react_1.default.createElement(Datum_1.default, { label: "Packet Loss Percentage", value: lossPercentage }))),
        react_1.default.createElement(MediaStreamTrackInfo_1.default, { track: mediaStreamTrack })));
};
exports.VideoTrackInfo = VideoTrackInfo;
const VideoTrackPublicationInfo = ({ publication }) => {
    const publishPriority = (0, usePublishPriority_1.default)(publication);
    const track = (0, useTrack_1.default)(publication);
    return (react_1.default.createElement(StatsContainer_1.default, null,
        react_1.default.createElement(Datum_1.default, { label: "Name", value: publication.trackName }),
        react_1.default.createElement(Datum_1.default, { label: "SID", value: publication.trackSid }),
        react_1.default.createElement(Datum_1.default, { label: "isSubscribed", value: !!track }),
        publishPriority !== undefined && react_1.default.createElement(Datum_1.default, { label: "publishPriority", value: publishPriority }),
        track && react_1.default.createElement(exports.VideoTrackInfo, { track: track, trackSid: publication.trackSid })));
};
exports.VideoTrackPublicationInfo = VideoTrackPublicationInfo;
