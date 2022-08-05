"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LineChart_1 = __importDefault(require("../LineChart/LineChart"));
const useStats_1 = __importDefault(require("../../../hooks/useStats/useStats"));
function ReceiveBandwidthChart() {
    const { receivedBitrateHistory, currentReceivedBitrate } = (0, useStats_1.default)();
    return (react_1.default.createElement(LineChart_1.default, { data: receivedBitrateHistory, yAxisLabel: 'Bits per second', title: `Total Bandwidth Received: ${currentReceivedBitrate === null || currentReceivedBitrate === void 0 ? void 0 : currentReceivedBitrate.toLocaleString()}kbps` }));
}
exports.default = ReceiveBandwidthChart;
