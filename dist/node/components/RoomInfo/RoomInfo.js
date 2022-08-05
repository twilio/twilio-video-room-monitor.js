"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Datum_1 = __importDefault(require("../typography/common/Datum/Datum"));
const Headline_1 = __importDefault(require("../typography/common/Headline/Headline"));
const useDominantSpeaker_1 = __importDefault(require("../../hooks/useDominantSpeaker/useDominantSpeaker"));
const useIsRecording_1 = __importDefault(require("../../hooks/useIsRecording/useIsRecording"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const useRoomState_1 = __importDefault(require("../../hooks/useRoomState/useRoomState"));
const useStats_1 = __importDefault(require("../../hooks/useStats/useStats"));
const Accordion_1 = require("../typography/common/Accordion/Accordion");
const NestedObject_1 = __importDefault(require("../typography/common/NestedObject/NestedObject"));
const ArrayData_1 = __importDefault(require("../typography/common/ArrayData/ArrayData"));
const ConnectionOptionTracks_1 = __importDefault(require("../typography/trackInformation/ConnectionOptionTracks/ConnectionOptionTracks"));
function RoomInfo() {
    const room = (0, useRoom_1.default)();
    const dominantSpeaker = (0, useDominantSpeaker_1.default)();
    const roomState = (0, useRoomState_1.default)();
    const isRecording = (0, useIsRecording_1.default)();
    const { currentReceivedBitrate, currentSentBitrate } = (0, useStats_1.default)();
    if (!room)
        return null;
    const { audio, automaticSubscription, bandwidthProfile, dscpTagging, enableDscp, iceServers, iceTransportPolicy, insights, maxAudioBitrate, maxVideoBitrate, name, networkQuality, region, preferredAudioCodecs, preferredVideoCodecs, loggerName, tracks, video, } = room._options;
    return (react_1.default.createElement("div", { style: { marginBottom: '1em' } },
        react_1.default.createElement(Headline_1.default, null, "Room information:"),
        roomState === 'disconnected' ? (react_1.default.createElement("span", null, "Not connected to a Twilio Video room.")) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Datum_1.default, { label: "Room Name", value: room.name }),
            react_1.default.createElement(Datum_1.default, { label: "SID", value: room.sid }),
            react_1.default.createElement(Datum_1.default, { label: "State", value: roomState }),
            react_1.default.createElement(Datum_1.default, { label: "Dominant Speaker", value: (dominantSpeaker === null || dominantSpeaker === void 0 ? void 0 : dominantSpeaker.identity) || null }),
            react_1.default.createElement(Datum_1.default, { label: "Media Region", value: room.mediaRegion }),
            react_1.default.createElement(Datum_1.default, { label: "Is Recording", value: isRecording }),
            react_1.default.createElement(Datum_1.default, { label: "Total Sent Bandwidth", value: (currentSentBitrate === null || currentSentBitrate === void 0 ? void 0 : currentSentBitrate.toLocaleString()) + 'kbps' }),
            react_1.default.createElement(Datum_1.default, { label: "Total Received Bandwidth", value: (currentReceivedBitrate === null || currentReceivedBitrate === void 0 ? void 0 : currentReceivedBitrate.toLocaleString()) + 'kbps' }),
            react_1.default.createElement(Accordion_1.Accordion, { label: "Connection Options" },
                react_1.default.createElement(NestedObject_1.default, { label: "Audio", obj: audio }),
                react_1.default.createElement(Datum_1.default, { label: "Automatic Subscription", value: automaticSubscription }),
                react_1.default.createElement(NestedObject_1.default, { label: "Bandwidth Profile", obj: bandwidthProfile }),
                react_1.default.createElement(Datum_1.default, { label: "Dominant Speaker", value: room._options.dominantSpeaker }),
                react_1.default.createElement(Datum_1.default, { label: "DSCP Tagging", value: dscpTagging }),
                react_1.default.createElement(Datum_1.default, { label: "Enable DSCP", value: enableDscp }),
                react_1.default.createElement(ArrayData_1.default, { label: "Ice Servers", arr: iceServers }),
                react_1.default.createElement(NestedObject_1.default, { label: "Ice Transport Policy", obj: iceTransportPolicy }),
                react_1.default.createElement(Datum_1.default, { label: "Insights", value: insights }),
                react_1.default.createElement(Datum_1.default, { label: "Max Audio Bitrate", value: maxAudioBitrate }),
                react_1.default.createElement(Datum_1.default, { label: "Max Video Bitrate", value: maxVideoBitrate }),
                react_1.default.createElement(Datum_1.default, { label: "Name", value: name }),
                react_1.default.createElement(NestedObject_1.default, { label: "Network Quality", obj: networkQuality }),
                react_1.default.createElement(Datum_1.default, { label: "Region", value: region }),
                react_1.default.createElement(ArrayData_1.default, { label: "Preferred Audio Codecs", arr: preferredAudioCodecs }),
                react_1.default.createElement(ArrayData_1.default, { label: "Preferred Video Codecs", arr: preferredVideoCodecs }),
                react_1.default.createElement(Datum_1.default, { label: "Logger Name", value: loggerName }),
                react_1.default.createElement(ConnectionOptionTracks_1.default, { tracks: tracks }),
                react_1.default.createElement(NestedObject_1.default, { label: "Video", obj: video }))))));
}
exports.default = RoomInfo;
