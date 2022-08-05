"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioTrackPublicationInfo = exports.AudioTrackInfo = void 0;
const react_1 = __importDefault(require("react"));
const useIsTrackEnabled_1 = __importDefault(require("../../../hooks/useIsTrackEnabled/useIsTrackEnabled"));
const useMediaStreamTrack_1 = __importDefault(require("../../../hooks/useMediaStreamTrack/useMediaStreamTrack"));
const useStatsUtils_1 = require("../../../hooks/useStats/useStatsUtils");
const useTrack_1 = __importDefault(require("../../../hooks/useTrack/useTrack"));
const Datum_1 = __importDefault(require("../../typography/common/Datum/Datum"));
const MediaStreamTrackInfo_1 = __importDefault(require("../../typography/trackInformation/MediaStreamTrackInfo/MediaStreamTrackInfo"));
const StatsContainer_1 = __importDefault(require("../../typography/common/StatsContainer/StatsContainer"));
const AudioTrackInfo = ({ track, trackSid }) => {
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
        react_1.default.createElement(Datum_1.default, { label: "isEnabled", value: isEnabled }),
        react_1.default.createElement(Datum_1.default, { label: "Bandwidth", value: (trackBandwidth === null || trackBandwidth === void 0 ? void 0 : trackBandwidth.toLocaleString()) + 'kbps' }),
        trackData && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Datum_1.default, { label: "Codec", value: trackData.codec }),
            react_1.default.createElement(Datum_1.default, { label: "Jitter", value: trackData.jitter }),
            react_1.default.createElement(Datum_1.default, { label: "Packets Lost", value: trackData.packetsLost }),
            react_1.default.createElement(Datum_1.default, { label: "Packet Loss Percentage", value: lossPercentage }))),
        react_1.default.createElement(MediaStreamTrackInfo_1.default, { track: mediaStreamTrack })));
};
exports.AudioTrackInfo = AudioTrackInfo;
const AudioTrackPublicationInfo = ({ publication }) => {
    const track = (0, useTrack_1.default)(publication);
    return (react_1.default.createElement(StatsContainer_1.default, null,
        react_1.default.createElement(Datum_1.default, { label: "Name", value: publication.trackName }),
        react_1.default.createElement(Datum_1.default, { label: "SID", value: publication.trackSid }),
        react_1.default.createElement(Datum_1.default, { label: "isSubscribed", value: !!track }),
        track && react_1.default.createElement(exports.AudioTrackInfo, { track: track, trackSid: publication.trackSid })));
};
exports.AudioTrackPublicationInfo = AudioTrackPublicationInfo;
