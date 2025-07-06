import React from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Shows from './pages/Shows.jsx'
import ShowDetails from './pages/ShowDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import Bookings from './pages/Bookings.jsx'
import Favorite from './pages/Favorite.jsx'

import AppLayout from './components/AppLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shows', element: <Shows /> },
      { path: '/shows/:id', element: <ShowDetails /> },
      { path: '/shows/:id/:date', element: <SeatLayout /> },
      { path: '/my-bookings', element: <Bookings /> },
      { path: '/my-favorite', element: <Favorite /> },
    ],
  },
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
