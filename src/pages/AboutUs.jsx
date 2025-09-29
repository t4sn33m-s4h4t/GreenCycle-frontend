// pages/About.jsx
import  global_vegetation_img from "../assets/global_vegetation.jpeg"
function AboutUs() {
  return (
    <div className="min-h-screen bg-background w-full text-textLight font-sans">
      <div className="w-full mx-auto px-6 py-20">
        {/* Title */}
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">
          About BloomWatch
        </h1>

        {/* Image Placeholder */}
        <div className="w-full h-64 bg-panel flex items-center justify-center rounded-xl mb-8">
          <img src={global_vegetation_img} alt="Global Vegetation" className="w-full h-full object-cover rounded-xl" />
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
