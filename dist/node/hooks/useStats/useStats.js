"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RoomStatsProvider_1 = require("../../components/RoomStatsProvider/RoomStatsProvider");
function useStats() {
    const stats = react_1.default.useContext(RoomStatsProvider_1.RoomStatsContext);
    return stats;
}
exports.default = useStats;
