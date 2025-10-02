// src/pages/AboutUs.jsx
import React from "react";
import global_vegetation_img from "../assets/global_vegetation.jpeg";

/**
 * About page — modern hero + product-like panels.
 * - Uses hero image, glass-style cards, and subtle micro-interactions.
 * - Keep copy concise and "futuristic" tone, like product pages.
 */

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans overflow-auto ">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <header className="grid gap-8 lg:grid-cols-2 items-center mb-10">
          <div>
            <h1 className="text-5xl font-heading font-bold text-primary leading-tight">
              BloomWatch
            </h1>
            <p className="mt-4 text-lg text-textLight/80 max-w-xl">
              Visualize global flowering phenology through satellite observations.
              We translate greenness and climate signals into actionable insights —
              for agriculture, ecology, and conservation.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="/map"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-black font-semibold hover:scale-105 transition"
              >
                Explore Map
              </a>
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-700"
              >
                View Dashboard
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full h-64 rounded-xl overflow-hidden bg-panel shadow-xl">
            <img
              src={global_vegetation_img}
              alt="Global vegetation"
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Value cards */}
        <section className="grid gap-6 md:grid-cols-3 mb-10">
          <div className="bg-panel rounded-2xl p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="font-heading text-lg text-primary mb-2">Research-Grade</h3>
            <p className="text-sm text-textLight/70">
              Built on NASA remote sensing datasets and phenology metrics — credible and reproducible.
            </p>
          </div>

          <div className="bg-panel rounded-2xl p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="font-heading text-lg text-primary mb-2">Interactive</h3>
            <p className="text-sm text-textLight/70">
              Live NDVI overlays, filters by biome/region, and time sliders for historical comparisons.
            </p>
          </div>

          <div className="bg-panel rounded-2xl p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1">
            <h3 className="font-heading text-lg text-primary mb-2">Actionable</h3>
            <p className="text-sm text-textLight/70">
              Bloom alerts and simple predictive models help farmers and researchers plan and respond.
            </p>
          </div>
        </section>

        {/* Long-form description */}
        <article className="bg-panel rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
            Why BloomWatch?
          </h2>
          <p className="text-lg leading-relaxed text-textLight/80 mb-4">
            Seasonal flowering patterns are a fingerprint of ecosystem health, crop cycles, and
            climate shifts. Satellites don’t see petals — but they do record vegetation activity.
            We combine those signals with climate overlays to estimate when landscapes enter their
            bloom phase.
          </p>

          <p className="text-lg leading-relaxed text-textLight/80">
            This project is designed as a research tool — not a consumer app. Expect transparent
            methods, reproducible data pipelines, and clear descriptions of uncertainty. Our goal is
            to help scientists, policy makers, and communities understand phenological change at
            scale.
          </p>
        </article>
      </div>
    </div>
  );
}