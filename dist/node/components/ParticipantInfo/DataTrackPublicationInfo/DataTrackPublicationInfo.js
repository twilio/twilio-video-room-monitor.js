"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTrackPublicationInfo = exports.DataTrackInfo = void 0;
const react_1 = __importDefault(require("react"));
const useIsTrackEnabled_1 = __importDefault(require("../../../hooks/useIsTrackEnabled/useIsTrackEnabled"));
const useIsTrackSwitchedOff_1 = __importDefault(require("../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff"));
const useTrack_1 = __importDefault(require("../../../hooks/useTrack/useTrack"));
const DataTrack_1 = __importDefault(require("../../typography/trackInformation/DataTrack/DataTrack"));
const Datum_1 = __importDefault(require("../../typography/common/Datum/Datum"));
const StatsContainer_1 = __importDefault(require("../../typography/common/StatsContainer/StatsContainer"));
const DataTrackInfo = ({ track }) => {
    const isEnabled = (0, useIsTrackEnabled_1.default)(track);
    const isSwitchedOff = (0, useIsTrackSwitchedOff_1.default)(track);
    if (track.isEnabled === undefined || track.isSwitchedOff === undefined) {
        return react_1.default.createElement(DataTrack_1.default, { track: track });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Datum_1.default, { label: "isEnabled", value: isEnabled }),
        react_1.default.createElement(Datum_1.default, { label: "isSwitchedOff", value: isSwitchedOff }),
        react_1.default.createElement(Datum_1.default, { label: "Priority", value: track.priority }),
        react_1.default.createElement(DataTrack_1.default, { track: track })));
};
exports.DataTrackInfo = DataTrackInfo;
const DataTrackPublicationInfo = ({ publication }) => {
    const track = (0, useTrack_1.default)(publication);
    return (react_1.default.createElement(StatsContainer_1.default, null,
        react_1.default.createElement(Datum_1.default, { label: "Kind", value: publication.kind }),
        react_1.default.createElement(Datum_1.default, { label: "isSubscribed", value: !!track }),
        track && react_1.default.createElement(exports.DataTrackInfo, { track: track })));
};
exports.DataTrackPublicationInfo = DataTrackPublicationInfo;
