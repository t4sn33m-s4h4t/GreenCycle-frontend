// src/pages/Team.jsx
import React from "react";
import { Mail, Github, Facebook } from "lucide-react";

// Import team member images
import nafisImage from "../assets/2.jpg";
import arnabImage from "../assets/1.jpg";
import prithishImage from "../assets/3.jpg";
import amritoImage from "../assets/4.jpg";
import tasneemImage from "../assets/5.jpg";

/**
 * Team page — modern "product" cards for team members.
 * - Uses your theme tokens (bg-panel, text-primary, accent colors).
 * - Responsive grid with subtle scale + shadow hover.
 * - External links open in new tab with safe rel attributes.
 */

const team = [
  {
    name: "Tasneem Al Sahat",
    role: "Full Stack Developer",
    email: "mdsahat6397@gmail.com",
    website: "https://www.facebook.com/t4sn33m.s4h4t/",
    github: "https://github.com/t4sn33m-s4h4t",
    image: tasneemImage,
  },
  {
    name: "Mohammad Nafis Fuad",
    role: "Frontend Developer",
    email: "nafisfuad2024@gmail.com",
    website: "https://facebook.com/mn.fuad26",
    github: "https://github.com/nafis2024",
    image: nafisImage,
  },
  {
    name: "Arnab Barua",
    role: "Backend Developer",
    email: "arnabxarnab06@gmail.com",
    website: "https://www.facebook.com/arnab.barua.2025/",
    github: "https://github.com/your-profile",
    image: arnabImage,
  },
  {
    name: "Prithish Ranjon Das",
    role: "Designer",
    email: "Prd200600@gmail.com",
    website: "https://www.facebook.com/share/17TEGefWhE/",
    github: "https://github.com/prithish-7",
    image: prithishImage,
  },
  {
    name: "Amrito Toppo",
    role: "UI/UX Designer",
    email: "amritot500@gmail.com",
    website: "https://www.facebook.com/Amrito.EXE09/",
    github: "https://github.com/amri36",
    image: amritoImage,
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header / Hero */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              Meet the Team
            </h1>
            <p className="mt-2 text-lg text-textLight/80 max-w-xl">
              The minds behind BloomWatch — developers and designers turning satellite
              observations into actionable phenology insights.
            </p>
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
                  aria-label={`${member.name} Facebook`}
                  className="p-3 rounded-md bg-panel/50 hover:bg-primary/10 transition-colors"
                >
                  <Facebook size={18} />
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

              {/* Short bio based on role */}
              <p className="mt-4 text-sm text-textLight/70">
                {member.role === "Full Stack Developer"
                  ? "Full-stack development and system architecture for BloomWatch."
                  : member.role === "Frontend Developer"
                  ? "Building sleek UI and data interactions for BloomWatch."
                  : member.role === "Backend Developer"
                  ? "Developing robust server infrastructure and APIs."
                  : member.role === "Designer"
                  ? "Strategic designer and editor for BloomWatch platform."
                  : member.role === "UI/UX Designer"
                  ? "Creative design expert focused on user experience excellence."
                  : "Passionate contributor to BloomWatch platform."}
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