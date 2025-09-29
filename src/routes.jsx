import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import NotFound from "./pages/NotFound";

// Pages
import Dashboard from "./pages/dashboard";
import Map from "./pages/Map";
import FilteringData from "./pages/FilteringData";
import GraphChart from "./pages/GraphChart";
import AboutUs from "./pages/AboutUs";
import CropPrediction from "./pages/CropPrediction";
import Contact from "./pages/Contact";

// Games
import Games from "./pages/Games";
import BloomMatcher from "./pages/games/BloomMatcher";
import PollenCollector from "./pages/games/PollenCollector";
import BloomSequence from "./pages/games/BloomSequence";
import PlantGrowth from "./pages/games/PlantGrowth";
import FlowerMatch from "./pages/games/FlowerMatch";
import BloomTimeline from "./pages/games/BloomTimeline";
import GameLayout from "./GameLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "map", element: <Map /> },
      { path: "filtering-data", element: <FilteringData /> },
      { path: "graph-chart", element: <GraphChart /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <Contact /> },
      { path: "predict-crop", element: <CropPrediction /> },
      { path: "games", element: <Games /> }
    ],
  },
  {
    path: "/games",
    element: <GameLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "bloom-matcher", element: <BloomMatcher /> },
      { path: "pollen-collector", element: <PollenCollector /> },
      { path: "bloom-sequence", element: <BloomSequence /> },
      { path: "plant-growth", element: <PlantGrowth /> },
      { path: "flower-match", element: <FlowerMatch /> },
      { path: "bloom-timeline", element: <BloomTimeline /> },

    ]
  }
]);

export default router;
