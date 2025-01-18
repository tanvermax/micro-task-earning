import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Routs } from './routs/Routs'
import Authprovider from './Provider/Authprovider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={Routs}></RouterProvider>
    </Authprovider>
  </StrictMode>,
)
