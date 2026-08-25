export const resume = {
  name: "Samat Abibulla",
  title: "Full-Stack Developer | Java Specialist | Problem Solver",
  summary:
    "Welcome to my world! I'm a backend engineer who's spent the last 9+ years turning tricky, high-load problems into systems that just work — think Java, Spring Boot, and microservices as my daily toolkit. I love designing distributed and event-driven architectures that stay fast and reliable even when millions of events are flying through them. Off the clock, I'm still that person who can't resist optimizing a slow query or automating away a tedious task with Kafka, PostgreSQL, Redis, Docker, Kubernetes, and the AWS stack.",
  contact: {
    phone: "+7-(701)-589-6111",
    email: "a.samat.dev@gmail.com",
    location: "Astana, Kazakhstan",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/samat-abibulla/" },
    ],
  },
  skillGroups: [
    {
      category: "Languages",
      items: ["Java (Expert)", "JavaScript (Intermediate)", "Python (Basic)"],
    },
    {
      category: "Backend",
      items: ["Spring Boot", "REST APIs", "Microservices", "Event-Driven Architecture"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "TimescaleDB", "Redis", "MongoDB"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (EC2, S3, ECS, RDS, etc.)", "Docker", "Kubernetes", "CI/CD", "GIT"],
    },
    {
      category: "Architecture",
      items: ["Distributed Systems", "System Design", "High Load Systems", "Scalability", "Fault Tolerance"],
    },
    {
      category: "Other",
      items: ["Performance Optimization", "Observability", "DSA (advanced)", "Problem Solving (advanced)"],
    },
  ],
  experience: [
    {
      role: "Senior Java Software Engineer",
      company: "Confidential",
      location: "Astana, Kazakhstan",
      period: "01/2024 — Present",
      bullets: [
        "Designed and implemented scalable microservices architecture using Java (Spring Boot), handling high-throughput workloads and ensuring system reliability (99.9%+ uptime).",
        "Owned end-to-end backend development lifecycle: design, implementation, testing, deployment, monitoring.",
        "Led database design and optimization for PostgreSQL/TimescaleDB, including indexing strategies, partitioning, and query tuning for large datasets (100M+ records).",
        "Implemented data lifecycle management (archiving, compression, retention policies) to reduce storage costs and improve query performance.",
        "Developed high-performance data processing pipelines for real-time and batch workloads.",
        "Deployed and operated services on AWS (EC2, S3, RDS, ECS) using Docker, ensuring scalability and high availability.",
        "Designed and maintained event-driven systems using Kafka and asynchronous messaging patterns.",
      ],
    },
    {
      role: "Team Lead Software Developer",
      company: "Halyk Market",
      location: "Almaty, Kazakhstan",
      period: "09/2022 — 01/2024",
      bullets: [
        "Architected and launched a centralized Product Information Management (PIM) system processing 1M+ daily product create/update operations.",
        "Redesigned product and category onboarding workflows, enabling content managers to add 4x more products and accelerating seller catalog expansion.",
        "Mentored interns and led the development of a distributed URL shortener service for product links, ensuring unique short URL generation and low-latency redirection under high read load.",
        "Designed and implemented a fuzzy product-matching engine using edit-distance-based similarity scoring to map seller-uploaded products to master catalog entries.",
        "Linked 90%+ similar products to boost deduplication accuracy and catalog consistency, reducing manual review effort.",
      ],
    },
    {
      role: "Senior Java Software Engineer",
      company: "Nitka Technologies",
      location: "Astana, Kazakhstan",
      period: "09/2021 — 09/2022",
      bullets: [
        "Designed and implemented backend services for managing user accounts and associated bank cards, supporting secure creation, update, activation, blocking, and status tracking workflows.",
        "Built RESTful APIs for card listing and user-card association with optimized PostgreSQL queries, reducing average response time by 30–40% through proper indexing and query tuning.",
        "Implemented secure handling of sensitive card metadata using encryption and masked responses (e.g., last 4 digits exposure only).",
        "Introduced pagination and filtering strategies for large card datasets to ensure scalable read performance.",
        "Implemented validation and data integrity checks to prevent duplicate card registration and inconsistent user associations.",
      ],
    },
    {
      role: "Senior Java Software Engineer",
      company: "KazDream Technologies LLC",
      location: "Astana, Kazakhstan",
      period: "05/2020 — 08/2021",
      bullets: [
        "Architected the design of a distributed event-processing platform handling 300K+ border-crossing events daily, scaling to 150+ peak events/sec while maintaining sub-100ms ingestion latency.",
        "Decomposed a monolithic workflow into asynchronous microservices backed by Kafka, increasing peak traffic handling capacity by 10× and eliminating ingestion bottlenecks.",
        "Designed partitioned, high-throughput data storage optimized for time-series workloads, reducing critical query latency by 40% for real-time operational dashboards.",
        "Built idempotent, fault-tolerant pipelines ensuring data consistency. Guaranteed at-least-once delivery preventing duplication.",
        "Implemented distributed caching (Redis) for high-frequency identity and watchlist lookups, reducing lookup latency from seconds to milliseconds and improving system throughput efficiency by 35%.",
        "Led performance optimization initiatives, increasing sustained write throughput to 500+ DB writes/sec during peak periods without service degradation.",
        "Designed and maintained event-driven systems using Kafka and asynchronous messaging patterns.",
      ],
    },
    {
      role: "Java Software Engineer",
      company: "Accenture",
      location: "Riga, Latvia",
      period: "04/2019 — 05/2020",
      bullets: [
        "Modernized a legacy read-heavy system backed by a multi-terabyte Oracle database, eliminating major query performance bottlenecks by introducing a CQRS architecture.",
        "Designed and implemented a real-time data replication pipeline using Striim → Kafka → DynamoDB, enabling horizontally scalable query workloads.",
        "Offloaded 80–90% of read traffic from the primary Oracle database, significantly improving system stability and reducing query latency.",
        "Reduced average query response time from seconds to milliseconds by serving reads from DynamoDB instead of transactional storage.",
        "Built an event-driven data synchronization layer processing millions of database change events daily.",
        "Enabled independent scaling of read and write workloads, supporting high-concurrency analytics and reporting queries.",
      ],
    },
    {
      role: "Java Software Engineer",
      company: "EPAM Systems",
      location: "Astana, Kazakhstan",
      period: "01/2018 — 03/2019",
      bullets: [
        "Contributed to the development of a logistics marketplace platform operating across multiple European countries, connecting drivers with clients for transportation services.",
        "Implemented backend features allowing drivers to publish transportation availability between cities and receive competitive bids from clients.",
        "Developed functionality enabling clients to create delivery requests and match with available drivers.",
        "Worked on bidding and matching workflows supporting real-time offer management between users.",
        "Assisted in building APIs handling transportation requests, bids, and user interactions.",
        "Participated in improving system reliability and performance for growing marketplace traffic.",
      ],
    },
    {
      role: "Java Software Engineer",
      company: "KazTransGas Aimak JSC",
      location: "Astana, Kazakhstan",
      period: "03/2017 — 01/2018",
      bullets: [
        "Contributed to development of a system responsible for collecting gas flow data from hundreds of metering devices across Kazakhstan.",
        "Developed reporting functionality used to analyze gas consumption and transportation metrics.",
        "Assisted in building database queries and services to aggregate large volumes of measurement data.",
        "Collaborated with senior engineers to improve data accuracy and reporting reliability.",
      ],
    },
  ],
  education: [
    {
      school: "Staffordshire University",
      degree: "Bachelor of Science in Software Engineering",
      location: "Stoke-on-Trent, United Kingdom",
      period: "01/2013 — 12/2016",
    },
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services" },
  ],
  achievements: [
    {
      title: "Developed PIM (Product Information Management) System",
      description:
        "Led a team that developed a new information management system for a marketplace, increasing product creation volume by 5x.",
    },
    {
      title: "Developed Border Crossing System",
      description:
        "Architected and implemented a centralized system for monitoring and tracking border crossings across Kazakhstan.",
    },
  ],
  languages: [
    { name: "English", level: "Advanced" },
    { name: "Russian", level: "Native" },
  ],
  strengths: [
    {
      title: "Go-Getter",
      description:
        "Actively supported teammates and junior developers, helping accelerate overall team productivity. Quickly learned new technologies and applied them in production environments to solve real business problems.",
    },
    {
      title: "Problem Solver",
      description:
        "Able to break down complex business requirements into practical and efficient engineering solutions.",
    },
  ],
};
