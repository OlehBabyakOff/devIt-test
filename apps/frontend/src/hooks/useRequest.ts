import { useState, useRef } from "react";

import { fetchIndex } from "@services/fetch-index";

type Result = {
  type: "success" | "error";
  index: number;
};

export function useRequest() {
  const [results, setResults] = useState<Result[]>([]);
  const [successfulResults, setSuccessfulResults] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const activeCountRef = useRef(0); // number of active concurrent requests
  const startedThisSecRef = useRef(0); // number of requests started this second
  const completedRef = useRef(0); // number of completed requests
  const queueRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const scheduleRequest = (limit: number, total: number) => {
    while (
      activeCountRef.current < limit &&
      startedThisSecRef.current < limit &&
      queueRef.current.length
    ) {
      const index = queueRef.current.shift();

      if (!index) {
        break;
      }

      startRequest(index, limit, total);
    }
  };

  const startRequest = async (index: number, limit: number, total: number) => {
    activeCountRef.current++;
    startedThisSecRef.current++;

    try {
      const data = await fetchIndex(index);

      setResults((prev) => [...prev, { type: "success", index: data }]);
      setSuccessfulResults((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      setResults((prev) => [...prev, { type: "error", index }]);
    } finally {
      activeCountRef.current--;
      completedRef.current++;

      scheduleRequest(limit, total);

      if (completedRef.current >= total) {
        clean();
      }
    }
  };

  const clean = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(false);
  };

  const run = (total: number, limit: number) => {
    if (isRunning || limit <= 0) {
      return;
    }

    setResults([]);
    setSuccessfulResults(0);
    setIsRunning(true);

    queueRef.current = Array.from({ length: total }, (_, i) => i + 1);
    completedRef.current = 0;
    activeCountRef.current = 0;
    startedThisSecRef.current = 0;

    intervalRef.current = setInterval(() => {
      startedThisSecRef.current = 0;

      scheduleRequest(limit, total);
    }, 1000);

    scheduleRequest(limit, total);
  };

  return { results, successfulResults, run, isRunning };
}
