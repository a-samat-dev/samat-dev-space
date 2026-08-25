export default function CardGrid({ items }) {
  return (
    <section className="projects">
      <div className="project-grid">
        {items.map((item) => (
          <div className="project-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.tags?.length > 0 && (
              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.links?.length > 0 && (
              <div className="project-links">
                {item.links.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
