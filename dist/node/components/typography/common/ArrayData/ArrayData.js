"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NestedObject_1 = __importDefault(require("../NestedObject/NestedObject"));
const Datum_1 = __importDefault(require("../Datum/Datum"));
const Accordion_1 = require("../Accordion/Accordion");
const StatsContainer_1 = __importDefault(require("../StatsContainer/StatsContainer"));
function ArrayData({ label, arr }) {
    if (typeof arr === 'undefined' || arr === null) {
        return react_1.default.createElement(Datum_1.default, { label: label, value: arr });
    }
    else if (arr.length === 0) {
        return react_1.default.createElement(Datum_1.default, { label: label, value: "undefined" });
    }
    return (react_1.default.createElement(Accordion_1.Accordion, { label: label }, arr.map((obj, i) => (react_1.default.createElement(StatsContainer_1.default, { key: i },
        react_1.default.createElement(NestedObject_1.default, { obj: obj }))))));
}
exports.default = react_1.default.memo(ArrayData);
