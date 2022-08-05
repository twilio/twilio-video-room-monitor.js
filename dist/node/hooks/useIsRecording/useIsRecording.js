"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
function useIsRecording() {
    const room = (0, useRoom_1.default)();
    const [isRecording, setIsRecording] = (0, react_1.useState)((room === null || room === void 0 ? void 0 : room.isRecording) || false);
    (0, react_1.useEffect)(() => {
        if (room) {
            setIsRecording(room.isRecording);
            const handleRecordingStarted = () => setIsRecording(true);
            const handleRecordingStopped = () => setIsRecording(false);
            room.on('recordingStarted', handleRecordingStarted);
            room.on('recordingStopped', handleRecordingStopped);
            return () => {
                room.off('recordingStarted', handleRecordingStarted);
                room.off('recordingStopped', handleRecordingStopped);
            };
        }
        else {
            setIsRecording(false);
        }
    }, [room]);
    return isRecording;
}
exports.default = useIsRecording;
