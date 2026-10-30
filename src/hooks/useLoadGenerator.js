import { useCallback, useEffect, useRef, useState } from "react";

const TICK_MS = 50;
const REPORT_MS = 500;
// Beyond this the browser only queues requests; sending fewer keeps the reported rate honest.
const MAX_IN_FLIGHT = 256;
const LATENCY_SAMPLES = 500;

export const MAX_RATE = 1000;

const IDLE = {
  sent: 0,
  completed: 0,
  outcomes: {},
  inFlight: 0,
  achievedRate: 0,
  avgLatencyMs: null,
  p95LatencyMs: null,
};

function freshRun() {
  return {
    rate: 0,
    startedAt: 0,
    planned: 0,
    sent: 0,
    completed: 0,
    outcomes: {},
    inFlight: 0,
    latencies: [],
    latencyIndex: 0,
    lastReportAt: 0,
    lastReportCompleted: 0,
    achievedRate: 0,
  };
}

function snapshot(run) {
  const sorted = [...run.latencies].sort((a, b) => a - b);
  const sum = sorted.reduce((total, ms) => total + ms, 0);
  return {
    sent: run.sent,
    completed: run.completed,
    outcomes: { ...run.outcomes },
    inFlight: run.inFlight,
    achievedRate: run.achievedRate,
    avgLatencyMs: sorted.length ? sum / sorted.length : null,
    p95LatencyMs: sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] : null,
  };
}

/**
 * Calls `sendOne` at a steady number of requests per second.
 *
 * `sendOne` resolves to a short outcome name ("created", "notFound", ...); a rejection counts as
 * "failed". Outcomes, throughput and latency are reported about twice a second.
 */
export function useLoadGenerator(sendOne) {
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState(IDLE);

  const run = useRef(freshRun());
  const timers = useRef({ tick: null, report: null });
  const sendOneRef = useRef(sendOne);
  useEffect(() => {
    sendOneRef.current = sendOne;
  });

  const report = useCallback(() => {
    const current = run.current;
    const now = performance.now();
    const elapsed = now - current.lastReportAt;
    if (elapsed >= 1000) {
      current.achievedRate = ((current.completed - current.lastReportCompleted) * 1000) / elapsed;
      current.lastReportAt = now;
      current.lastReportCompleted = current.completed;
    }
    setStats(snapshot(current));
    // Keep reporting after a stop until the last responses have come back.
    if (timers.current.tick === null && current.inFlight === 0) {
      current.achievedRate = 0;
      setStats(snapshot(current));
      clearInterval(timers.current.report);
      timers.current.report = null;
    }
  }, []);

  const fire = useCallback(() => {
    const current = run.current;
    current.sent += 1;
    current.inFlight += 1;
    const startedAt = performance.now();
    Promise.resolve()
      .then(() => sendOneRef.current())
      .catch(() => "failed")
      .then((outcome) => {
        // A reset swapped in a new run while this request was under way: its result is moot.
        if (run.current !== current) return;
        current.inFlight -= 1;
        current.completed += 1;
        current.outcomes[outcome] = (current.outcomes[outcome] ?? 0) + 1;
        current.latencies[current.latencyIndex] = performance.now() - startedAt;
        current.latencyIndex = (current.latencyIndex + 1) % LATENCY_SAMPLES;
      });
  }, []);

  const tick = useCallback(() => {
    const current = run.current;
    const now = performance.now();
    let due = Math.floor(((now - current.startedAt) / 1000) * current.rate) - current.planned;
    // More than a second behind (a throttled background tab, or the in-flight cap): start the
    // schedule over instead of bursting to catch up.
    if (due > current.rate) {
      current.startedAt = now;
      current.planned = 0;
      due = 0;
    }
    while (due > 0 && current.inFlight < MAX_IN_FLIGHT) {
      fire();
      current.planned += 1;
      due -= 1;
    }
  }, [fire]);

  const stop = useCallback(() => {
    clearInterval(timers.current.tick);
    timers.current.tick = null;
    setRunning(false);
  }, []);

  const start = useCallback(
    (ratePerSecond) => {
      const current = run.current;
      const now = performance.now();
      current.rate = ratePerSecond;
      current.startedAt = now;
      current.planned = 0;
      current.lastReportAt = now;
      current.lastReportCompleted = current.completed;
      clearInterval(timers.current.tick);
      timers.current.tick = setInterval(tick, TICK_MS);
      if (timers.current.report === null) {
        timers.current.report = setInterval(report, REPORT_MS);
      }
      setRunning(true);
    },
    [tick, report],
  );

  /** Stops and forgets everything counted so far. */
  const reset = useCallback(() => {
    stop();
    clearInterval(timers.current.report);
    timers.current.report = null;
    run.current = freshRun();
    setStats(IDLE);
  }, [stop]);

  useEffect(() => {
    const active = timers.current;
    return () => {
      clearInterval(active.tick);
      clearInterval(active.report);
    };
  }, []);

  return { running, stats, start, stop, reset };
}
