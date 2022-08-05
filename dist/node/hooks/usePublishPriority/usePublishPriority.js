"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function usePublishPriority(publication) {
    const [publishPriority, setPublishPriority] = (0, react_1.useState)(publication.publishPriority);
    (0, react_1.useEffect)(() => {
        setPublishPriority(publication.publishPriority);
        const handlePublishPriorityChanged = (priority) => setPublishPriority(priority);
        publication.on('publishPriorityChanged', handlePublishPriorityChanged);
        return () => {
            publication.off('publishPriorityChanged', handlePublishPriorityChanged);
        };
    }, [publication]);
    return publishPriority;
}
exports.default = usePublishPriority;
