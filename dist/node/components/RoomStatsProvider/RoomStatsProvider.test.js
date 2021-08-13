"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const react_1 = __importDefault(require("react"));
const react_hooks_1 = require("@testing-library/react-hooks");
const RoomStatsProvider_1 = __importStar(require("./RoomStatsProvider"));
const useGetStats_1 = __importDefault(require("../../hooks/useGetStats/useGetStats"));
const useRoom_1 = __importDefault(require("../../hooks/useRoom/useRoom"));
const useStats_1 = __importDefault(require("../../hooks/useStats/useStats"));
const statsHooks = __importStar(require("../../hooks/useStats/useStatsUtils"));
// @ts-ignore
statsHooks.getTotalBandwidth = jest.fn((kind) => (kind === 'bytesReceived' ? 0 : 1));
const mockGetTotalBandwidth = statsHooks.getTotalBandwidth;
jest.mock('../../hooks/useRoom/useRoom', () => jest.fn(() => 'mockRoom'));
jest.mock('../../hooks/useGetStats/useGetStats', () => jest.fn(() => 'mockStats'));
const mockUseGetStats = useGetStats_1.default;
const mockUseRoom = useRoom_1.default;
describe('the truncateFront function', () => {
    it('should remove elements from the front of the array so that the arrays length remains less than or equal to the specified limit', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(RoomStatsProvider_1.truncateFront(data, 10)).toEqual(data); // Do nothing when the limit is larger than the array length
        expect(RoomStatsProvider_1.truncateFront(data, 6)).toEqual([3, 4, 5, 6, 7, 8]);
    });
});
describe('the RoomStatsProvider component', () => {
    it('should correctly return stats and previousStats', () => {
        const wrapper = ({ children }) => react_1.default.createElement(RoomStatsProvider_1.default, null, children);
        const { result, rerender } = react_hooks_1.renderHook(useStats_1.default, { wrapper });
        expect(mockUseRoom).toHaveBeenCalled();
        expect(mockUseGetStats).toHaveBeenCalledWith('mockRoom');
        expect(result.current).toMatchObject({ previousStats: undefined, stats: 'mockStats' });
        mockUseGetStats.mockImplementationOnce(() => 'mockStats2');
        rerender();
        expect(result.current).toMatchObject({ previousStats: 'mockStats', stats: 'mockStats2' });
    });
    it('should correctly return bandwidth statistics and history', () => {
        Date.now = () => 1000;
        const wrapper = ({ children }) => react_1.default.createElement(RoomStatsProvider_1.default, null, children);
        const { result, rerender } = react_hooks_1.renderHook(useStats_1.default, { wrapper });
        expect(result.current).toMatchObject({
            receivedBitrateHistory: [{ x: 1000, y: 0 }],
            sentBitrateHistory: [{ x: 1000, y: 1 }],
            currentReceivedBitrate: 0,
            currentSentBitrate: 1,
        });
        Date.now = () => 2000;
        mockGetTotalBandwidth.mockImplementation((kind) => (kind === 'bytesReceived' ? 2 : 3));
        mockUseGetStats.mockImplementationOnce(() => 'mockStats2');
        rerender();
        expect(result.current).toMatchObject({
            receivedBitrateHistory: [
                { x: 1000, y: 0 },
                { x: 2000, y: 2 },
            ],
            sentBitrateHistory: [
                { x: 1000, y: 1 },
                { x: 2000, y: 3 },
            ],
            currentReceivedBitrate: 2,
            currentSentBitrate: 3,
        });
    });
});
