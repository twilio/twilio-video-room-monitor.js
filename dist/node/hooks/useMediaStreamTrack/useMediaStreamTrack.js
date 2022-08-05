"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/*
 * This hook allows components to reliably use the 'mediaStreamTrack' property of
 * an AudioTrack or a VideoTrack. Whenever 'localTrack.restart(...)' is called, it
 * will replace the mediaStreamTrack property of the localTrack, but the localTrack
 * object will stay the same. Therefore this hook is needed in order for components
 * to rerender in response to the mediaStreamTrack changing.
 */
function useMediaStreamTrack(track) {
    const [mediaStreamTrack, setMediaStreamTrack] = (0, react_1.useState)(track === null || track === void 0 ? void 0 : track.mediaStreamTrack);
    (0, react_1.useEffect)(() => {
        setMediaStreamTrack(track === null || track === void 0 ? void 0 : track.mediaStreamTrack);
        if (track) {
            const handleStarted = () => setMediaStreamTrack(track.mediaStreamTrack);
            track.on('started', handleStarted);
            return () => {
                track.off('started', handleStarted);
            };
        }
    }, [track]);
    return mediaStreamTrack;
}
exports.default = useMediaStreamTrack;
