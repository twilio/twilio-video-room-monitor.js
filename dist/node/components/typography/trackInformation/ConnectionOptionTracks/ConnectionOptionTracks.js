"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Accordion_1 = require("../../common/Accordion/Accordion");
const Datum_1 = __importDefault(require("../../common/Datum/Datum"));
const MediaStreamTrackInfo_1 = __importDefault(require("../MediaStreamTrackInfo/MediaStreamTrackInfo"));
const StatsContainer_1 = __importDefault(require("../../common/StatsContainer/StatsContainer"));
const DataTrack_1 = __importDefault(require("../DataTrack/DataTrack"));
function ConnectionOptionTracks({ tracks }) {
    if (typeof tracks === 'undefined' || tracks === null) {
        return react_1.default.createElement(Datum_1.default, { label: "Tracks", value: tracks });
    }
    return (react_1.default.createElement(Accordion_1.Accordion, { label: "Tracks" }, tracks.map((track, i) => {
        if (track instanceof MediaStreamTrack) {
            return (react_1.default.createElement(StatsContainer_1.default, { key: i },
                react_1.default.createElement(MediaStreamTrackInfo_1.default, { track: track })));
        }
        if (track.kind === 'audio' || track.kind === 'video') {
            const { kind, name, id, mediaStreamTrack } = track;
            return (react_1.default.createElement(StatsContainer_1.default, { key: i },
                react_1.default.createElement(Datum_1.default, { label: "Kind", value: kind }),
                react_1.default.createElement(Datum_1.default, { label: "Name", value: name }),
                react_1.default.createElement(Datum_1.default, { label: "ID", value: id }),
                react_1.default.createElement(MediaStreamTrackInfo_1.default, { track: mediaStreamTrack })));
        }
        // LocalDataTrack
        return (react_1.default.createElement(StatsContainer_1.default, { key: i },
            react_1.default.createElement(DataTrack_1.default, { track: track })));
    })));
}
exports.default = react_1.default.memo(ConnectionOptionTracks);
