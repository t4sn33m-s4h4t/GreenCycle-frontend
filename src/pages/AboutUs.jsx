// pages/About.jsx
function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-textLight font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">
          About BloomWatch
        </h1>

        {/* Image Placeholder */}
        <div className="w-full h-64 bg-panel flex items-center justify-center rounded-xl mb-8">
          <p className="text-textLight opacity-70">
            [Image: Satellite imagery of global vegetation / flowers blooming]
          </p>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed mb-6">
          BloomWatch is our solution for{" "}
          <span className="text-accent font-semibold">
            NASA Space Apps Challenge 2025
          </span>
          . Our mission is to visualize, detect, and monitor plant blooming
          events around the world using NASA’s Earth observation data.
        </p>

        <p className="text-lg leading-relaxed">
          From deserts to agricultural lands, seasonal flowering cycles tell the
          story of ecosystems, pollinators, and global climate. Our tool is
          designed to provide actionable insights for{" "}
          <span className="text-secondary font-semibold">
            agriculture, ecology, and conservation
          </span>{" "}
          at both local and global scales.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
