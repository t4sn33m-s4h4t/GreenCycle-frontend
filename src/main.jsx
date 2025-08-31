import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./Router/Router"

import {
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer autoClose={1000} position='top-center' />
  </StrictMode>,
)