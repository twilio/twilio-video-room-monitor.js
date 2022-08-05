"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useWindowDimensions() {
    var _a, _b;
    const [dimensions, setDimensions] = (0, react_1.useState)({
        height: window.innerHeight * (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.scale) || 1),
        width: window.innerWidth * (((_b = window.visualViewport) === null || _b === void 0 ? void 0 : _b.scale) || 1),
    });
    (0, react_1.useEffect)(() => {
        const onResize = () => {
            var _a, _b;
            setDimensions({
                height: window.innerHeight * (((_a = window.visualViewport) === null || _a === void 0 ? void 0 : _a.scale) || 1),
                width: window.innerWidth * (((_b = window.visualViewport) === null || _b === void 0 ? void 0 : _b.scale) || 1),
            });
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });
    return dimensions;
}
exports.default = useWindowDimensions;
