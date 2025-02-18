import { useEffect, useRef } from "react";

export const useOutsideClick = (callback, listenCapturping = true) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, listenCapturping);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturping);
  }, [callback, listenCapturping]);

  return ref;
};
