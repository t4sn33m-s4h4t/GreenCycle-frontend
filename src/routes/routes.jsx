import { createBrowserRouter } from "react-router-dom";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <p className="text-3xl font-bold bg-primary ">Home Page</p>,
  },
  {
    path: "/test",
    element: <p className="text-3xl font-bold bg-primary ">Home Page</p>,
  },
]);
export default router;