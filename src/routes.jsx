import {
  createBrowserRouter,
} from "react-router-dom";

import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "contact-us",
        element: <Contact />
      },
    ]
  },

]);
export default router;