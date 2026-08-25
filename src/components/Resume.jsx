import { resume } from "../data/resume";

export default function Resume() {
  return (
    <section className="resume">
      <p className="summary">{resume.summary}</p>

      <div className="contact-row">
        {resume.contact.phone && <span>{resume.contact.phone}</span>}
        <span>{resume.contact.email}</span>
        <span>{resume.contact.location}</span>
        {resume.contact.links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>

      <h2>Skills</h2>
      {resume.skillGroups.map((group) => (
        <div className="skill-group" key={group.category}>
          <div className="skill-group-label">{group.category}</div>
          <ul className="skill-list">
            {group.items.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Experience</h2>
      {resume.experience.map((job) => (
        <div className="entry" key={job.role + job.company + job.period}>
          <div className="entry-header">
            <strong>{job.role}</strong>
            <span>{job.period}</span>
          </div>
          <div className="entry-subheader">
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
          </div>
          <ul>
            {job.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Key Achievements</h2>
      {resume.achievements.map((item) => (
        <div className="entry" key={item.title}>
          <div className="entry-header">
            <strong>{item.title}</strong>
          </div>
          <p className="entry-text">{item.description}</p>
        </div>
      ))}

      <h2>Education</h2>
      {resume.education.map((edu) => (
        <div className="entry" key={edu.school}>
          <div className="entry-header">
            <strong>{edu.degree}</strong>
            <span>{edu.period}</span>
          </div>
          <div className="entry-subheader">
            {edu.school}
            {edu.location ? ` · ${edu.location}` : ""}
          </div>
        </div>
      ))}

      <h2>Certifications</h2>
      {resume.certifications.map((cert) => (
        <div className="entry" key={cert.name}>
          <div className="entry-header">
            <strong>{cert.name}</strong>
          </div>
          <div className="entry-subheader">{cert.issuer}</div>
        </div>
      ))}

      <h2>Languages</h2>
      <div className="contact-row">
        {resume.languages.map((lang) => (
          <span key={lang.name}>
            {lang.name} — {lang.level}
          </span>
        ))}
      </div>

      <h2>Strengths</h2>
      {resume.strengths.map((strength) => (
        <div className="entry" key={strength.title}>
          <div className="entry-header">
            <strong>{strength.title}</strong>
          </div>
          <p className="entry-text">{strength.description}</p>
        </div>
      ))}
    </section>
  );
}
