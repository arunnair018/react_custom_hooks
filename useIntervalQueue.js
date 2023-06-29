import { useEffect, useRef, useState } from "react";

const useIntervalQueue = (initialQueue, interval) => {
  const queueRef = useRef([]);
  const [state, setState] = useState(initialQueue);

  useEffect(() => {
    const timer = setInterval(() => {
      if (queueRef.current.length > 0) {
        const item = queueRef.current.shift();
        setState((prev) => [...prev, item]);
      }
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [queueRef.current]);

  const enqueue = (item) => {
    queueRef.current = [...queueRef.current, ...item];
  };
  return [state, enqueue];
};

export default useIntervalQueue;
