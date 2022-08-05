"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useParticipants_1 = __importDefault(require("../../hooks/useParticipants/useParticipants"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const useRoomState_1 = __importDefault(require("../../hooks/useRoomState/useRoomState"));
const Headline_1 = __importDefault(require("../typography/common/Headline/Headline"));
const Participant_1 = require("./Participant/Participant");
function ParticipantInfo() {
    const participants = (0, useParticipants_1.default)();
    const room = (0, useRoom_1.default)();
    const roomState = (0, useRoomState_1.default)();
    if (!room || roomState === 'disconnected')
        return null;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Headline_1.default, null,
            "Participant Information (",
            participants.length + 1,
            "):"),
        react_1.default.createElement(Participant_1.Participant, { participant: room.localParticipant, isLocal: true }),
        participants.map((participant) => (react_1.default.createElement(Participant_1.Participant, { key: participant.sid, participant: participant })))));
}
exports.default = ParticipantInfo;
