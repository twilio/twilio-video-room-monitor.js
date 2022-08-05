"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomStatsProvider = exports.RoomStatsContext = exports.truncateFront = void 0;
const react_1 = __importStar(require("react"));
const useStatsUtils_1 = require("../../hooks/useStats/useStatsUtils");
const constants_1 = require("../../constants");
const useGetStats_1 = __importDefault(require("../../hooks/useGetStats/useGetStats"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const truncateFront = (arr, limit) => arr.slice(Math.max(0, arr.length - limit), arr.length);
exports.truncateFront = truncateFront;
exports.RoomStatsContext = react_1.default.createContext(null);
const RoomStatsProvider = ({ children }) => {
    var _a, _b;
    const previousStatsRef = (0, react_1.useRef)();
    const receivedBitrateHistoryRef = (0, react_1.useRef)([]);
    const sentBitrateHistoryRef = (0, react_1.useRef)([]);
    const room = (0, useRoom_1.default)();
    const stats = (0, useGetStats_1.default)(room);
    const previousStats = previousStatsRef.current;
    previousStatsRef.current = stats;
    const totalReceivedBitrate = (0, useStatsUtils_1.getTotalBandwidth)('bytesReceived', stats, previousStats);
    const newReceivedBytesHistory = receivedBitrateHistoryRef.current.concat({
        x: Date.now(),
        y: totalReceivedBitrate,
    });
    receivedBitrateHistoryRef.current = (0, exports.truncateFront)(newReceivedBytesHistory, constants_1.MAX_STAT_HISTORY_LENGTH);
    const totalSentBitrate = (0, useStatsUtils_1.getTotalBandwidth)('bytesSent', stats, previousStats);
    const newSentBytesHistory = sentBitrateHistoryRef.current.concat({ x: Date.now(), y: totalSentBitrate });
    sentBitrateHistoryRef.current = (0, exports.truncateFront)(newSentBytesHistory, constants_1.MAX_STAT_HISTORY_LENGTH);
    return (react_1.default.createElement(exports.RoomStatsContext.Provider, { value: {
            stats,
            previousStats,
            receivedBitrateHistory: receivedBitrateHistoryRef.current,
            sentBitrateHistory: sentBitrateHistoryRef.current,
            currentReceivedBitrate: (_a = receivedBitrateHistoryRef.current.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.y,
            currentSentBitrate: (_b = sentBitrateHistoryRef.current.slice(-1)[0]) === null || _b === void 0 ? void 0 : _b.y,
        } }, children));
};
exports.RoomStatsProvider = RoomStatsProvider;
exports.default = exports.RoomStatsProvider;
