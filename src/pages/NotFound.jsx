// pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-textLight font-sans">
      <div className="text-center bg-panel p-10 rounded-2xl shadow-lg max-w-md">
        <h1 className="text-9xl font-heading font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-secondary">
          Page Not Found
        </h2>
        <p className="mt-2 text-textLight">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-accent text-black font-medium px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
