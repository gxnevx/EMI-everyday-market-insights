import { useRef, useState, useCallback } from "react";

export function usePullRefresh(onRefresh) {
  const startY = useRef(0);
  const [pullDist, setPullDist] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const THRESHOLD = 80;

  const onTouchStart = useCallback((e) => {
    if (window.scrollY === 0 && !refreshing) {
      startY.current = e.touches[0].clientY;
    }
  }, [refreshing]);

  const onTouchMove = useCallback((e) => {
    if (!startY.current || refreshing) return;
    const dy = Math.max(0, e.touches[0].clientY - startY.current);
    setPullDist(Math.min(dy * 0.5, 120));
  }, [refreshing]);

  const onTouchEnd = useCallback(() => {
    if (pullDist >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPullDist(50);
      onRefresh().finally(() => {
        setRefreshing(false);
        setPullDist(0);
        startY.current = 0;
      });
    } else {
      setPullDist(0);
      startY.current = 0;
    }
  }, [pullDist, refreshing, onRefresh]);

  return { onTouchStart, onTouchMove, onTouchEnd, pullDist, refreshing };
}
