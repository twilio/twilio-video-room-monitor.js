"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
function useParticipants() {
    const room = (0, useRoom_1.default)();
    const [participants, setParticipants] = (0, react_1.useState)(room ? Array.from(room.participants.values()) : []);
    (0, react_1.useEffect)(() => {
        if (!room)
            return;
        setParticipants(Array.from(room.participants.values()));
        const participantConnected = (participant) => setParticipants((prevParticipants) => [...prevParticipants, participant]);
        const participantDisconnected = (participant) => setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        return () => {
            room.off('participantConnected', participantConnected);
            room.off('participantDisconnected', participantDisconnected);
        };
    }, [room]);
    return participants;
}
exports.default = useParticipants;
