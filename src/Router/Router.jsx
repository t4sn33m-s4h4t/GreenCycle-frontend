
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root.jsx"; 
import Error from '../Pages/Error.jsx'
import Home from '../Pages/Home.jsx'
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
     
    ]
  },
 
]);
export default router;