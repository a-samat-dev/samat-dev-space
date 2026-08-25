import { useState } from "react";
import Nav from "./components/Nav";
import Resume from "./components/Resume";
import CardGrid from "./components/CardGrid";
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

export default function App() {
  const [tab, setTab] = useState("resume");

  return (
    <div className="app">
      <header className="header">
        <h1>{resume.name}</h1>
        <p className="title">{resume.title}</p>
        <Nav active={tab} onChange={setTab} />
      </header>

      <main className="main">
        {tab === "resume" ? <Resume /> : <CardGrid items={SECTIONS[tab]} />}
      </main>
    </div>
  );
}
