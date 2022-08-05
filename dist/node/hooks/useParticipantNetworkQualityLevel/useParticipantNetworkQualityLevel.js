"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useParticipantNetworkQualityLevel(participant) {
    const [networkQualityLevel, setNetworkQualityLevel] = (0, react_1.useState)(participant.networkQualityLevel);
    (0, react_1.useEffect)(() => {
        const handleNewtorkQualityLevelChange = (newNetworkQualityLevel) => setNetworkQualityLevel(newNetworkQualityLevel);
        setNetworkQualityLevel(participant.networkQualityLevel);
        participant.on('networkQualityLevelChanged', handleNewtorkQualityLevelChange);
        return () => {
            participant.off('networkQualityLevelChanged', handleNewtorkQualityLevelChange);
        };
    }, [participant]);
    return networkQualityLevel;
}
exports.default = useParticipantNetworkQualityLevel;
