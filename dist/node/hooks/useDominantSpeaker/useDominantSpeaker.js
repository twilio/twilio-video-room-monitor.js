"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useRoom_1 = __importDefault(require("../useRoom/useRoom"));
function useDominantSpeaker() {
    const room = (0, useRoom_1.default)();
    const [dominantSpeaker, setDominantSpeaker] = (0, react_1.useState)((room === null || room === void 0 ? void 0 : room.dominantSpeaker) || null);
    (0, react_1.useEffect)(() => {
        if (room) {
            const handleDominantSpeakerChanged = (newDominantSpeaker) => setDominantSpeaker(newDominantSpeaker);
            room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
            return () => {
                room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
            };
        }
        else {
            setDominantSpeaker(null);
        }
    }, [room]);
    return dominantSpeaker;
}
exports.default = useDominantSpeaker;
