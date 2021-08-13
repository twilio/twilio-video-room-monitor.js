"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Accordion_1 = require("../Accordion/Accordion");
const Datum_1 = __importDefault(require("../Datum/Datum"));
const StatsContainer_1 = __importDefault(require("../StatsContainer/StatsContainer"));
function NestedObject({ label, obj }) {
    if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null) {
        return react_1.default.createElement(Datum_1.default, { label: String(label), value: obj });
    }
    const Component = label ? Accordion_1.Accordion : StatsContainer_1.default;
    return (react_1.default.createElement(Component, { label: label }, Object.entries(obj).map(([key, val], i) => {
        if (typeof val === 'object' && !Array.isArray(val)) {
            // object
            return react_1.default.createElement(NestedObject, { key: i, label: key, obj: val });
        }
        else {
            // primitives
            return react_1.default.createElement(Datum_1.default, { key: i, label: key, value: val });
        }
    })));
}
exports.default = react_1.default.memo(NestedObject);
