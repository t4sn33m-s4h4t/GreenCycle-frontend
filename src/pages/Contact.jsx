// src/pages/Contact.jsx
import React from "react";
import { Mail, Globe, Linkedin, Github } from "lucide-react";

/**
 * Contact page — modern "product" cards for team members.
 * - Uses your theme tokens (bg-panel, text-primary, accent colors).
 * - Responsive grid with subtle scale + shadow hover.
 * - External links open in new tab with safe rel attributes.
 */

const team = [
  {
    name: "Tasneem Al Sahat",
    role: "Full Stack Developer",
    email: "tasneem@example.com",
    website: "https://facebook.com/your-profile",
    linkedin: "https://linkedin.com/in/your-profile",
    github: "https://github.com/your-profile",
    image: "https://via.placeholder.com/300?text=TAS", // replace with real portrait
  },
  {
    name: "John Doe",
    role: "Data Scientist",
    email: "johndoe@example.com",
    website: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    image: "https://via.placeholder.com/300?text=JD",
  },
  {
    name: "Mohammad Nafis Fuad",
    role: "Front-end Developer",
    email: "nafis@example.com",
    website: "https://example.com",
    linkedin: "https://linkedin.com/in/nafis2024",
    github: "https://github.com/nafis2024",
    image: "https://via.placeholder.com/300?text=NF",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              Meet the Team
            </h1>
            <p className="mt-2 text-lg text-textLight/80 max-w-xl">
              The minds behind BloomWatch — engineers, scientists, and designers turning satellite
              observations into actionable phenology insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* small subtle CTA */}
            <a
              href="#team"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-panel/60 border border-gray-700 hover:scale-105 transition-transform text-sm"
            >
              View Team
            </a>
          </div>
        </div>

        {/* Team Grid */}
        <section id="team" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <article
              key={idx}
              className="relative bg-panel rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Decorative accent ring (subtle) */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full ring-1 ring-accent/20 blur-sm opacity-30 pointer-events-none" />

              {/* Avatar */}
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-accent"
              />

              {/* Name + Role */}
              <h2 className="text-xl font-heading font-semibold text-primary">
                {member.name}
              </h2>
              <p className="text-sm text-textLight/70 mb-4">{member.role}</p>

              {/* Contact actions */}
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Email ${member.name}`}
                  className="p-3 rounded-md bg-panel/50 hover:bg-primary/10 transition-colors"
                >
                  <Mail size={18} />
                </a>

                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} website`}
                  className="p-3 rounded-md bg-panel/50 hover:bg-primary/10 transition-colors"
                >
                  <Globe size={18} />
                </a>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} linkedin`}
                  className="p-3 rounded-md bg-panel/50 hover:bg-primary/10 transition-colors"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} github`}
                  className="p-3 rounded-md bg-panel/50 hover:bg-primary/10 transition-colors"
                >
                  <Github size={18} />
                </a>
              </div>

              {/* optional: short bio or badges */}
              <p className="mt-4 text-sm text-textLight/70">
                {member.role === "Front-end Developer"
                  ? "Frontend engineer — building sleek UI and data interactions."
                  : "Passionate contributor to BloomWatch."}
              </p>
            </article>
          ))}
        </section>

        {/* Footer / contact CTA */}
        <div className="mt-12 bg-panel rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-heading text-primary">Want to connect?</h3>
            <p className="text-sm text-textLight/70">
              Reach out to us via email or check out our GitHub repositories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@bloomwatch.example"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-black font-semibold hover:brightness-95 transition"
            >
              Contact Us
            </a>
            <a
              href="https://github.com/nafis2024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
