import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MAX_RATE, useLoadGenerator } from "../hooks/useLoadGenerator";
import { createUrlShortenerApi } from "../lib/urlShortenerApi";

const STATS_REFRESH_MS = 2000;
const READ_POOL_SIZE = 1000;
const SEEDED_USER_IDS = [1, 2, 3];

const count = (value) => (value == null ? "–" : value.toLocaleString("en-US"));
const milliseconds = (value) => (value == null ? "–" : `${Math.round(value).toLocaleString("en-US")} ms`);
const perSecond = (value) => `${value < 10 ? value.toFixed(1) : Math.round(value).toLocaleString("en-US")}/s`;

function parseRate(text) {
  const rate = Number(text);
  return Number.isFinite(rate) && rate >= 1 && rate <= MAX_RATE ? rate : null;
}

function Stat({ label, value }) {
  return (
    <div className="lab-stat">
      <div className="lab-stat-label">{label}</div>
      <div className="lab-stat-value">{value}</div>
    </div>
  );
}

function LoadPanel({ title, hint, rateLabel, generator, outcomes, onStart, message }) {
  const [rateText, setRateText] = useState("10");
  const rate = parseRate(rateText);
  const { running, stats } = generator;
  const inputId = `rate-${title.toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <section className="lab-panel">
      <h3>{title}</h3>
      <p className="lab-hint">{hint}</p>

      <div className="lab-controls">
        <label htmlFor={inputId}>{rateLabel}</label>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min="1"
          max={MAX_RATE}
          step="1"
          value={rateText}
          disabled={running}
          aria-invalid={rate === null}
          onChange={(event) => setRateText(event.target.value)}
        />
        {running ? (
          <button className="btn" onClick={generator.stop}>
            Stop
          </button>
        ) : (
          <button className="btn btn-primary" disabled={rate === null} onClick={() => onStart(rate)}>
            Start
          </button>
        )}
      </div>
      {rate === null && <p className="lab-message">Enter a rate between 1 and {MAX_RATE}.</p>}
      {message && <p className="lab-message">{message}</p>}

      <div className="lab-stats">
        <Stat label="Sent" value={count(stats.sent)} />
        {outcomes.map((outcome) => (
          <Stat key={outcome.key} label={outcome.label} value={count(stats.outcomes[outcome.key] ?? 0)} />
        ))}
      </div>
      <div className="lab-stats">
        <Stat label="Throughput" value={perSecond(stats.achievedRate)} />
        <Stat label="Avg latency" value={milliseconds(stats.avgLatencyMs)} />
        <Stat label="p95 latency" value={milliseconds(stats.p95LatencyMs)} />
      </div>
    </section>
  );
}

export default function UrlShortenerLab({ lab }) {
  const api = useMemo(() => createUrlShortenerApi(lab.apiBase), [lab.apiBase]);

  // Short codes the read simulation picks from: a sample of what is stored, plus whatever the
  // write simulation creates while this page is open.
  const readPool = useRef([]);
  // Makes the simulated target urls of this page visit distinct from any other.
  const session = useRef({ id: null, sequence: 0 });

  const [system, setSystem] = useState(null);
  const [unreachable, setUnreachable] = useState(false);
  const [readMessage, setReadMessage] = useState(null);
  const [clearing, setClearing] = useState("idle"); // idle | confirming | working
  const [notice, setNotice] = useState(null);

  const writes = useLoadGenerator(async () => {
    session.current.id ??= Date.now().toString(36);
    const sequence = (session.current.sequence += 1);
    const userId = SEEDED_USER_IDS[sequence % SEEDED_USER_IDS.length];
    const shortCode = await api.createShortUrl(
      `https://example.com/simulated/${session.current.id}/${sequence}`,
      userId,
    );
    const pool = readPool.current;
    if (pool.length < READ_POOL_SIZE) {
      pool.push(shortCode);
    } else {
      pool[Math.floor(Math.random() * pool.length)] = shortCode;
    }
    return "created";
  });

  const reads = useLoadGenerator(async () => {
    const pool = readPool.current;
    if (pool.length === 0) return "failed";
    return api.visit(pool[Math.floor(Math.random() * pool.length)]);
  });

  const refreshSystem = useCallback(async () => {
    try {
      setSystem(await api.stats());
      setUnreachable(false);
    } catch {
      setUnreachable(true);
    }
  }, [api]);

  // Poll while the page is open and visible.
  useEffect(() => {
    const poll = () => {
      if (!document.hidden) refreshSystem();
    };
    const first = setTimeout(poll, 0);
    const timer = setInterval(poll, STATS_REFRESH_MS);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [refreshSystem]);

  async function startReads(rate) {
    setReadMessage(null);
    if (readPool.current.length === 0) {
      try {
        readPool.current = await api.sampleShortCodes(READ_POOL_SIZE);
      } catch {
        setReadMessage("Could not load short urls to read.");
        return;
      }
    }
    if (readPool.current.length === 0) {
      setReadMessage("There are no short urls yet. Run some writes first.");
      return;
    }
    reads.start(rate);
  }

  async function clearEverything() {
    setClearing("working");
    writes.reset();
    reads.reset();
    readPool.current = [];
    try {
      await api.clearEverything();
      setNotice("Deleted every short url, emptied the cache and reset the counter to 0.");
    } catch {
      setNotice("Clearing failed. The system may be only partly cleared; try again.");
    }
    setClearing("idle");
    refreshSystem();
  }

  return (
    <div className="lab">
      <div className="lab-links">
        <a className="btn" href={lab.grafanaUrl} target="_blank" rel="noreferrer">
          Open Grafana
        </a>
        <a className="btn" href={lab.logsUrl} target="_blank" rel="noreferrer">
          Open logs
        </a>
      </div>

      <section className="lab-panel">
        <h3>Current state</h3>
        {unreachable && <p className="lab-message">The URL shortener is not reachable right now.</p>}
        <div className="lab-stats">
          <Stat label="Short urls in database" value={count(system?.urls)} />
          <Stat label="Redirects in cache" value={count(system?.cached)} />
          <Stat label="Global counter" value={count(system?.counter)} />
        </div>

        <div className="lab-clear">
          {clearing === "idle" && (
            <button
              className="btn btn-danger"
              onClick={() => {
                setNotice(null);
                setClearing("confirming");
              }}
            >
              Clear everything
            </button>
          )}
          {clearing === "confirming" && (
            <>
              <span>Delete every short url, empty the cache and reset the counter?</span>
              <button className="btn btn-danger" onClick={clearEverything}>
                Yes, delete everything
              </button>
              <button className="btn" onClick={() => setClearing("idle")}>
                Cancel
              </button>
            </>
          )}
          {clearing === "working" && <span>Clearing…</span>}
          {notice && (
            <span className="lab-notice" role="status">
              {notice}
            </span>
          )}
        </div>
      </section>

      <div className="lab-panels">
        <LoadPanel
          title="Simulate writes"
          hint="Creates new short urls through the gateway and the write service."
          rateLabel="Writes per second"
          generator={writes}
          outcomes={[
            { key: "created", label: "Created" },
            { key: "failed", label: "Failed" },
          ]}
          onStart={writes.start}
        />
        <LoadPanel
          title="Simulate reads"
          hint="Requests random existing short urls, as visitors would, without following the redirect."
          rateLabel="Reads per second"
          generator={reads}
          outcomes={[
            { key: "redirected", label: "Redirected" },
            { key: "notFound", label: "Not found" },
            { key: "failed", label: "Failed" },
          ]}
          onStart={startReads}
          message={readMessage}
        />
      </div>
    </div>
  );
}
