import UrlShortenerLab from "./UrlShortenerLab";

export default function SystemDesign({ items, selectedId, onSelect }) {
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <section className="design">
      <nav className="design-menu" aria-label="System designs">
        {items.map((item) => (
          <button
            key={item.id}
            className={`design-menu-item ${item.id === selected.id ? "active" : ""}`}
            aria-current={item.id === selected.id ? "page" : undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.menuLabel}
          </button>
        ))}
      </nav>

      <article className="design-page">
        <h2>{selected.title}</h2>
        <p className="design-description">{selected.description}</p>
        {selected.tags?.length > 0 && (
          <div className="tag-list">
            {selected.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {selected.links?.length > 0 && (
          <div className="project-links">
            {selected.links.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Keyed so switching designs starts the page from scratch. */}
        {selected.lab && <UrlShortenerLab key={selected.id} lab={selected.lab} />}
      </article>
    </section>
  );
}
