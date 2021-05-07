import { useEffect, useRef } from 'react';

export default function useDrag() {
  const draggableRef = useRef<HTMLDivElement>(); // The element that the user drags
  const dragContainerRef = useRef<HTMLDivElement>(); // The container that is moved when dragged
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const draggableEl = draggableRef.current;
    const dragContainerEl = dragContainerRef.current;

    if (draggableEl && dragContainerEl) {
      const handleMousemove = (e: MouseEvent) => {
        const { x, y } = mousePositionRef.current;
        dragContainerEl.style.left = `${e.clientX - x}px`;
        dragContainerEl.style.top = `${e.clientY - y}px`;
      };

      const handleMouseDown = (e: MouseEvent) => {
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
