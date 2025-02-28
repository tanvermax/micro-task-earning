import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Routs } from './routs/Routs'
import Authprovider from './Provider/Authprovider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './Mainlayout/ThemeProvider'
const queryClinent = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
   <QueryClientProvider client={queryClinent}>
   <Authprovider>
    <RouterProvider router={Routs}></RouterProvider>
    </Authprovider>
   </QueryClientProvider>
   </ThemeProvider>
  </StrictMode>,
)
