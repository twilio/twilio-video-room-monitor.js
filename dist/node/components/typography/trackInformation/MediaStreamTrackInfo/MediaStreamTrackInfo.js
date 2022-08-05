"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const useMediaStreamTrackProperties_1 = __importDefault(require("../../../../hooks/useMediaStreamTrackProperties/useMediaStreamTrackProperties"));
const NestedObject_1 = __importDefault(require("../../common/NestedObject/NestedObject"));
function MediaStreamTrackInfo({ track }) {
    const mediaStreamTrackProperties = (0, useMediaStreamTrackProperties_1.default)(track);
    return react_1.default.createElement(NestedObject_1.default, { label: "Media Stream Track", obj: mediaStreamTrackProperties });
}
exports.default = react_1.default.memo(MediaStreamTrackInfo);
