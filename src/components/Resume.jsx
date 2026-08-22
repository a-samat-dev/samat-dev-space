import { resume } from "../data/resume";

export default function Resume() {
  return (
    <section className="resume">
      <p className="summary">{resume.summary}</p>

      <div className="contact-row">
        <span>{resume.contact.email}</span>
        <span>{resume.contact.location}</span>
        {resume.contact.links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>

      <h2>Skills</h2>
      <ul className="skill-list">
        {resume.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h2>Experience</h2>
      {resume.experience.map((job) => (
        <div className="entry" key={job.role + job.company}>
          <div className="entry-header">
            <strong>{job.role}</strong>
            <span>{job.period}</span>
          </div>
          <div className="entry-subheader">{job.company}</div>
          <ul>
            {job.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Education</h2>
      {resume.education.map((edu) => (
        <div className="entry" key={edu.school}>
          <div className="entry-header">
            <strong>{edu.degree}</strong>
            <span>{edu.period}</span>
          </div>
          <div className="entry-subheader">{edu.school}</div>
        </div>
      ))}
    </section>
  );
}
