import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import NotFound from "./pages/NotFound";

// Pages
import Dashboard from "./pages/dashboard";
import Map from "./pages/Map";
import FilteringData from "./pages/FilteringData";
import GraphChart from "./pages/GraphChart";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // 👈 means "/" will load Dashboard by default
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "filtering-data",
        element: <FilteringData />,
      },
      {
        path: "graph-chart",
        element: <GraphChart />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
