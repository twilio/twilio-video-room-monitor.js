"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const theme_1 = require("../../../theme");
exports.default = react_1.default.memo(styled_components_1.default.div `
  &:not(:last-child) {
    border-bottom: 1px solid ${theme_1.theme.borderColor};
    margin-bottom: 3px;
  }
  padding-bottom: 3px;

  &:hover {
    background: rgba(50, 50, 50, 0.9);
  }
`);
