import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Resume from "./components/Resume";
import CardGrid from "./components/CardGrid";
import SystemDesign from "./components/SystemDesign";
import { resume } from "./data/resume";
import { projects } from "./data/projects";
import { dsa } from "./data/dsa";
import { systemDesign } from "./data/systemDesign";
import { aiEngineering } from "./data/aiEngineering";
import { hobbies } from "./data/hobbies";
import "./App.css";

const SECTIONS = {
  projects,
  dsa,
  systemDesign,
  aiEngineering,
  hobbies,
};

// The address is "#<tab>" or "#<tab>/<page>", so a reload or a shared link lands on the same view.
function readLocation() {
  const [tab, page] = window.location.hash.slice(1).split("/");
  return { tab: tab === "resume" || tab in SECTIONS ? tab : "resume", page: page || null };
}

export default function App() {
  const [location, setLocation] = useState(readLocation);
  const { tab, page } = location;

  useEffect(() => {
    const onHashChange = () => setLocation(readLocation());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function navigate(nextTab, nextPage = null) {
    const hash = nextPage ? `#${nextTab}/${nextPage}` : `#${nextTab}`;
    window.history.replaceState(null, "", hash);
    setLocation({ tab: nextTab, page: nextPage });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>{resume.name}</h1>
        <p className="title">{resume.title}</p>
        <Nav active={tab} onChange={(nextTab) => navigate(nextTab)} />
      </header>

      <main className="main">
        {tab === "resume" && <Resume />}
        {tab === "systemDesign" && (
          <SystemDesign
            items={systemDesign}
            selectedId={page}
            onSelect={(id) => navigate("systemDesign", id)}
          />
        )}
        {tab !== "resume" && tab !== "systemDesign" && <CardGrid items={SECTIONS[tab]} />}
      </main>
    </div>
  );
}
