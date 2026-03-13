import { useState, useEffect } from "react";

const KEY_PREFIX = "emi_refreshes_";

function todayKey() {
  return KEY_PREFIX + new Date().toISOString().split("T")[0];
}

export function useRefreshCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const k = todayKey();
    setCount(parseInt(localStorage.getItem(k) || "0", 10));
  }, []);

  const increment = () => {
    const k = todayKey();
    const next = (parseInt(localStorage.getItem(k) || "0", 10)) + 1;
    localStorage.setItem(k, String(next));
    setCount(next);
  };

  return { count, increment };
}
