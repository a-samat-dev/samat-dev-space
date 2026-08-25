const TABS = [
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Demo Projects" },
  { id: "dsa", label: "Data Structures & Algorithms" },
  { id: "systemDesign", label: "System Design" },
  { id: "aiEngineering", label: "AI Engineering" },
  { id: "hobbies", label: "Hobbies" },
];

export default function Nav({ active, onChange }) {
  return (
    <nav className="nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-link ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
