"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AppContainer_1 = __importDefault(require("./components/AppContainer/AppContainer"));
const ParticipantInfo_1 = __importDefault(require("./components/ParticipantInfo/ParticipantInfo"));
const RoomInfo_1 = __importDefault(require("./components/RoomInfo/RoomInfo"));
const RoomProvider_1 = __importDefault(require("./components/RoomProvider/RoomProvider"));
const RoomStatsProvider_1 = __importDefault(require("./components/RoomStatsProvider/RoomStatsProvider"));
const ReceiveBandwidthChart_1 = __importDefault(require("./components/StatsCharts/ReceiveBandwidth/ReceiveBandwidthChart"));
const SentBandwidthChart_1 = __importDefault(require("./components/StatsCharts/SentBandwidthChart/SentBandwidthChart"));
function App() {
    return (react_1.default.createElement(RoomProvider_1.default, null,
        react_1.default.createElement(RoomStatsProvider_1.default, null,
            react_1.default.createElement(AppContainer_1.default, null, (activeTab) => (react_1.default.createElement(react_1.default.Fragment, null,
                activeTab === 'info' && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(RoomInfo_1.default, null),
                    react_1.default.createElement(ParticipantInfo_1.default, null))),
                activeTab === 'stats' && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ReceiveBandwidthChart_1.default, null),
                    react_1.default.createElement(SentBandwidthChart_1.default, null)))))))));
}
exports.default = App;
