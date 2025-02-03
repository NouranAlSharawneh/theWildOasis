import { useEffect, useRef } from "react";

export const useOutsideClick = (callback) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });

    return () =>
      document.removeEventListener("click", handleClick, {
        capture: true,
      });
  }, [callback]);

  return ref;
};
