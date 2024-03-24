import { useEffect } from "react";

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;
      callback();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
};
