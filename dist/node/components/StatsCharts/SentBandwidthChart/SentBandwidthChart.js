"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LineChart_1 = __importDefault(require("../LineChart/LineChart"));
const useStats_1 = __importDefault(require("../../../hooks/useStats/useStats"));
function SentBandwidthChart() {
    const { sentBitrateHistory, currentSentBitrate } = (0, useStats_1.default)();
    return (react_1.default.createElement(LineChart_1.default, { data: sentBitrateHistory, yAxisLabel: 'Bits per second', title: `Total Bandwidth Sent: ${currentSentBitrate === null || currentSentBitrate === void 0 ? void 0 : currentSentBitrate.toLocaleString()}kbps` }));
}
exports.default = SentBandwidthChart;
