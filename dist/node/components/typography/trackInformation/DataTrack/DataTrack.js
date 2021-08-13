"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Datum_1 = __importDefault(require("../../common/Datum/Datum"));
function Tracks({ track }) {
    const { kind, maxPacketLifeTime, maxRetransmits, ordered, reliable } = track;
    const idProp = track.isEnabled === undefined ? { label: 'ID', value: track.id } : { label: 'SID', value: track.sid };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Datum_1.default, { label: "Kind", value: kind }),
        react_1.default.createElement(Datum_1.default, { label: idProp.label, value: idProp.value }),
        react_1.default.createElement(Datum_1.default, { label: "maxPacketLifeTime", value: maxPacketLifeTime }),
        react_1.default.createElement(Datum_1.default, { label: "maxRetransmits", value: maxRetransmits }),
        react_1.default.createElement(Datum_1.default, { label: "Ordered", value: ordered }),
        react_1.default.createElement(Datum_1.default, { label: "Reliable", value: reliable })));
}
exports.default = react_1.default.memo(Tracks);
