/// <reference types="react" />
export default function useDrag(): {
    draggableRef: import("react").MutableRefObject<HTMLDivElement | undefined>;
    dragContainerRef: import("react").MutableRefObject<HTMLDivElement | undefined>;
};
