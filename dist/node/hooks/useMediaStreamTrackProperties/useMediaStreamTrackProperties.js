"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useMediaStreamTrackProperties(mediaStreamTrack) {
    const [muted, setMuted] = (0, react_1.useState)(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.muted);
    const [readyState, setReadyState] = (0, react_1.useState)(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.readyState);
    (0, react_1.useEffect)(() => {
        setMuted(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.muted);
        setReadyState(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.readyState);
        if (mediaStreamTrack) {
            const handleMuted = () => setMuted(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.muted);
            const handleReadyState = () => setReadyState(mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.readyState);
            mediaStreamTrack.addEventListener('mute', handleMuted);
            mediaStreamTrack.addEventListener('unmute', handleMuted);
            mediaStreamTrack.addEventListener('ended', handleReadyState);
            return () => {
                mediaStreamTrack.removeEventListener('mute', handleMuted);
                mediaStreamTrack.removeEventListener('unmute', handleMuted);
                mediaStreamTrack.removeEventListener('ended', handleReadyState);
            };
        }
    }, [mediaStreamTrack]);
    return {
        muted,
        readyState,
        id: mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.id,
        label: mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.label,
        kind: mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.kind,
    };
}
exports.default = useMediaStreamTrackProperties;
