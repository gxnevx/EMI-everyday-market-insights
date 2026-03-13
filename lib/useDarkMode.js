import { useState, useEffect } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(localStorage.getItem("emi_dark") === "1");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("emi_dark", next ? "1" : "0");
    document.body.classList.toggle("dark", next);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return { dark, toggle };
}
