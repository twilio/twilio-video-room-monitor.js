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
const constants = __importStar(require("../../../constants"));
const LineChart_1 = __importStar(require("./LineChart"));
const enzyme_1 = require("enzyme");
const xychart_1 = require("@visx/xychart");
// @ts-ignore
constants.MAX_STAT_HISTORY_LENGTH = 5;
// @ts-ignore
constants.UPDATE_INTERVAL = 100;
Date.now = () => 1000;
describe('the formatBitrate function', () => {
    [
        { bytes: 789, result: '789 K' },
        { bytes: 10.5, result: '11 K' },
        { bytes: 1000, result: '1 M' },
        { bytes: 1250, result: '1.3 M' },
        { bytes: 55555, result: '55.6 M' },
        { bytes: 100000, result: '100 M' },
        { bytes: 999000, result: '999 M' },
        { bytes: 1000000, result: '1 G' },
        { bytes: 12570000, result: '12.57 G' },
    ].forEach((testCase) => {
        it(`should format ${testCase.bytes} to "${testCase.result}"`, () => {
            expect(LineChart_1.formatBitrate(testCase.bytes)).toBe(testCase.result);
        });
    });
});
describe('the LineChart component', () => {
    it('it should correctly set the xScale when the largest x value is greater than xDomainMin', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(LineChart_1.default, { title: "Test Chart", yAxisLabel: "Y Axis", data: [{ x: 2000, y: 10 }] }));
        expect(wrapper.find(xychart_1.XYChart).prop('xScale')).toEqual({ domain: [1500, 2000], type: 'time' });
    });
    it('it should correctly set the xScale when the largest x value is less than xDomainMin', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(LineChart_1.default, { title: "Test Chart", yAxisLabel: "Y Axis", data: [
                { x: 1400, y: 10 },
                { x: 2000, y: 10 },
            ] }));
        expect(wrapper.find(xychart_1.XYChart).prop('xScale')).toEqual({ domain: [1400, 2000], type: 'time' });
    });
    it('it should correctly set the yScale when the largest y value is less than 50', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(LineChart_1.default, { title: "Test Chart", yAxisLabel: "Y Axis", data: [{ x: 2000, y: 0 }] }));
        expect(wrapper.find(xychart_1.XYChart).prop('yScale')).toEqual({ domain: [0, 50], type: 'linear' });
    });
    it('it should correctly set the yScale when the largest y value is greater than 50', () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(LineChart_1.default, { title: "Test Chart", yAxisLabel: "Y Axis", data: [{ x: 1400, y: 10000 }] }));
        expect(wrapper.find(xychart_1.XYChart).prop('yScale')).toEqual({ domain: [0, 10000], type: 'linear' });
    });
});
