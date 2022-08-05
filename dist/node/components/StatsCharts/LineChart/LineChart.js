"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBitrate = void 0;
const react_1 = __importDefault(require("react"));
const curve_1 = require("@visx/curve");
const Headline_1 = __importDefault(require("../../typography/common/Headline/Headline"));
const constants_1 = require("../../../constants");
const d3_array_1 = require("d3-array");
const xychart_1 = require("@visx/xychart");
function formatBitrate(bytes, suffixIndex = 0) {
    const suffixes = ['K', 'M', 'G'];
    if (bytes < 1000)
        return +bytes.toFixed(suffixIndex) + ' ' + suffixes[suffixIndex];
    return formatBitrate(bytes / 1000, suffixIndex + 1);
}
exports.formatBitrate = formatBitrate;
const theme = (0, xychart_1.buildChartTheme)({
    backgroundColor: 'transparent',
    colors: ['#E22525'],
    tickLength: 2,
    gridColor: '#333',
    gridColorDark: '#333',
    svgLabelSmall: { strokeWidth: 0.2, stroke: '#ddd', fill: '#ddd' },
    svgLabelBig: { strokeWidth: 0, fill: '#ddd' },
});
function LineChart({ data, title, yAxisLabel }) {
    var _a, _b;
    const minTime = Date.now() - constants_1.UPDATE_INTERVAL * constants_1.MAX_STAT_HISTORY_LENGTH + 1000;
    const xDomainMin = Math.min((_a = (0, d3_array_1.min)(data, (d) => d.x)) !== null && _a !== void 0 ? _a : 0, minTime);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Headline_1.default, null, title),
        react_1.default.createElement(xychart_1.XYChart, { height: 275, width: 465, xScale: {
                type: 'time',
                domain: [xDomainMin, (_b = (0, d3_array_1.max)(data, (d) => d.x)) !== null && _b !== void 0 ? _b : 0],
            }, yScale: {
                type: 'linear',
                domain: [0, Math.max(50, (0, d3_array_1.max)(data, (d) => d.y))],
            }, margin: { top: 10, left: 65, right: 0, bottom: 50 }, theme: theme },
            react_1.default.createElement(xychart_1.Grid, { columns: false, numTicks: 5, strokeDasharray: "2" }),
            react_1.default.createElement(xychart_1.Grid, { rows: false, strokeDasharray: "2", numTicks: 5 }),
            react_1.default.createElement(xychart_1.Axis, { orientation: "bottom", label: "Time", numTicks: 5 }),
            react_1.default.createElement(xychart_1.Axis, { orientation: "left", label: yAxisLabel, numTicks: 5, tickFormat: (d) => formatBitrate(d), labelOffset: 36 }),
            react_1.default.createElement(xychart_1.LineSeries, { dataKey: "x", data: data, xAccessor: (d) => d.x, yAccessor: (d) => d.y, curve: curve_1.curveMonotoneX }))));
}
exports.default = LineChart;
