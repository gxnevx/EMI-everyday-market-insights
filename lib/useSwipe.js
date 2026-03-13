import { useRef, useState } from "react";

export function useSwipe(onLeft, onRight) {
  const startX = useRef(0);
  const startY = useRef(0);
  const [dir, setDir] = useState(null);

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setDir(null);
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;

    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) {
      if (dx < 0) { setDir("left"); onLeft(); }
      else { setDir("right"); onRight(); }
      // Reset animation class after it plays
      setTimeout(() => setDir(null), 300);
    }
  };

  return { onTouchStart, onTouchEnd, swipeDir: dir };
}
