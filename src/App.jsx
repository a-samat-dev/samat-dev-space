import { useState } from "react";
import Nav from "./components/Nav";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import { resume } from "./data/resume";
import "./App.css";

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
        {tab === "resume" ? <Resume /> : <Projects />}
      </main>
    </div>
  );
}
