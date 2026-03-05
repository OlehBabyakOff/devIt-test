import { useState, useRef } from "react";

import { fetchIndex } from "@services/fetch-index";

export function useRequest() {
  const [results, setResults] = useState<{ type: string; index: number }[]>([]);
  const [successfulResults, setSuccessfulResults] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const activeCountRef = useRef(0); // number of active concurrent requests
  const startedThisSecRef = useRef(0); // number of requests started this second
  const completedRef = useRef(0); // number of completed requests
  const queueRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const run = async (total: number, limit: number) => {
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

      scheduleRequest();
    }, 1000);

    const scheduleRequest = () => {
      if (completedRef.current >= total) {
        clean();

        return;
      }

      while (
        activeCountRef.current < limit &&
        startedThisSecRef.current < limit &&
        queueRef.current.length
      ) {
        const index = queueRef.current.shift();

        if (!index) {
          return;
        }

        startRequest(index);
      }
    };

    const startRequest = async (index: number) => {
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

        scheduleRequest();
      }
    };

    const clean = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsRunning(false);
    };

    scheduleRequest();
  };

  return { results, successfulResults, run, isRunning };
}
