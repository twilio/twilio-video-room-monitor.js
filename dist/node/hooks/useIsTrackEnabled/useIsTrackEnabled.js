"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useIsTrackEnabled(track) {
    const [isEnabled, setIsEnabled] = (0, react_1.useState)(track ? track.isEnabled : false);
    (0, react_1.useEffect)(() => {
        setIsEnabled(track ? track.isEnabled : false);
        if (track) {
            const setEnabled = () => setIsEnabled(true);
            const setDisabled = () => setIsEnabled(false);
            track.on('enabled', setEnabled);
            track.on('disabled', setDisabled);
            return () => {
                track.off('enabled', setEnabled);
                track.off('disabled', setDisabled);
            };
        }
    }, [track]);
    return isEnabled;
}
exports.default = useIsTrackEnabled;
