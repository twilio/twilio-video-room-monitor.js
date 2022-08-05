"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useTrack(publication) {
    const [track, setTrack] = (0, react_1.useState)(publication && publication.track);
    (0, react_1.useEffect)(() => {
        // Reset the track when the 'publication' variable changes.
        setTrack(publication && publication.track);
        if (publication) {
            const removeTrack = () => setTrack(null);
            publication.on('subscribed', setTrack);
            publication.on('unsubscribed', removeTrack);
            return () => {
                publication.off('subscribed', setTrack);
                publication.off('unsubscribed', removeTrack);
            };
        }
    }, [publication]);
    return track;
}
exports.default = useTrack;
