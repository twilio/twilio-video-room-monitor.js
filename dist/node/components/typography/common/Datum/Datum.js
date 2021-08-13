"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../../theme");
const Text = styled_components_1.default.span `
  font-size: ${theme_1.theme.fontSizes.small};
`;
function Datum({ label, value }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Text, null,
            label,
            ": ",
            String(value))));
}
exports.default = react_1.default.memo(Datum);
