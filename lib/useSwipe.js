import { useRef } from "react";

export function useSwipe(onLeft, onRight) {
  const startX = useRef(0);
  const startY = useRef(0);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;

    // Only trigger if horizontal swipe is dominant and > 60px
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) onLeft();   // swipe left → next
      else onRight();          // swipe right → prev
    }
  };

  return { onTouchStart, onTouchEnd };
}
