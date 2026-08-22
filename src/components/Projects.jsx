import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="projects">
      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  Live demo
                </a>
              )}
              {project.codeUrl && (
                <a href={project.codeUrl} target="_blank" rel="noreferrer">
                  Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
