"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useParticipantIsReconnecting(participant) {
    const [isReconnecting, setIsReconnecting] = react_1.useState(false);
    react_1.useEffect(() => {
        const handleReconnecting = () => setIsReconnecting(true);
        const handleReconnected = () => setIsReconnecting(false);
        handleReconnected(); // Reset state when there is a new participant
        participant.on('reconnecting', handleReconnecting);
        participant.on('reconnected', handleReconnected);
        return () => {
            participant.off('reconnecting', handleReconnecting);
            participant.off('reconnected', handleReconnected);
        };
    }, [participant]);
    return isReconnecting;
}
exports.default = useParticipantIsReconnecting;
