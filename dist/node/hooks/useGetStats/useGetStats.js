"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const constants_1 = require("../../constants");
function useGetStats(room) {
    const [stats, setStats] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        let intervalId;
        if (room) {
            const getStats = () => room.getStats().then((updatedStats) => setStats(updatedStats));
            getStats();
            intervalId = window.setInterval(getStats, constants_1.UPDATE_INTERVAL);
            return () => {
                window.clearInterval(intervalId);
            };
        }
    }, [room]);
    return stats;
}
exports.default = useGetStats;
