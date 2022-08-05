"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const theme_1 = require("../../components/theme");
function useDrag() {
    const draggableRef = (0, react_1.useRef)(); // The element that the user drags
    const dragContainerRef = (0, react_1.useRef)(); // The container that is moved when dragged
    const mousePositionRef = (0, react_1.useRef)({ x: 0, y: 0 });
    (0, react_1.useEffect)(() => {
        const draggableEl = draggableRef.current;
        const dragContainerEl = dragContainerRef.current;
        if (draggableEl && dragContainerEl) {
            const handleMousemove = (e) => {
                // On mobile devices, we disable dragging since the Monitor is
                // displayed over the whole screen.
                if (window.innerWidth < theme_1.theme.monitorWidth)
                    return;
                const { x, y } = mousePositionRef.current;
                dragContainerEl.style.left = `${e.clientX - x}px`;
                dragContainerEl.style.top = `${e.clientY - y}px`;
            };
            const handleMouseDown = (e) => {
                mousePositionRef.current.x = e.clientX - dragContainerEl.offsetLeft;
                mousePositionRef.current.y = e.clientY - dragContainerEl.offsetTop;
                document.body.addEventListener('mousemove', handleMousemove);
            };
            const handleMouseUp = () => {
                document.body.removeEventListener('mousemove', handleMousemove);
                mousePositionRef.current = { x: 0, y: 0 };
            };
            draggableEl.addEventListener('mousedown', handleMouseDown);
            document.body.addEventListener('mouseup', handleMouseUp);
            return () => {
                draggableEl.removeEventListener('mousedown', handleMouseDown);
                document.body.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, []);
    return { draggableRef, dragContainerRef };
}
exports.default = useDrag;
