"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useVideoTrackDimensions(track) {
    const [dimensions, setDimensions] = (0, react_1.useState)(track === null || track === void 0 ? void 0 : track.dimensions);
    (0, react_1.useEffect)(() => {
        setDimensions(track === null || track === void 0 ? void 0 : track.dimensions);
        if (track) {
            const handleDimensionsChanged = (newTrack) => setDimensions({
                width: newTrack.dimensions.width,
                height: newTrack.dimensions.height,
            });
            track.on('dimensionsChanged', handleDimensionsChanged);
            return () => {
                track.off('dimensionsChanged', handleDimensionsChanged);
            };
        }
    }, [track]);
    return dimensions;
}
exports.default = useVideoTrackDimensions;
