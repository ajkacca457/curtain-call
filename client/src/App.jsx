import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Shows from './pages/Shows.jsx'
import ShowDetails from './pages/ShowDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import Bookings from './pages/Bookings.jsx'
import Favorite from './pages/Favorite.jsx'
import Dashboard from './components/admin/Dashboard.jsx'

import AppLayout from './components/AppLayout.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import ListShows from './components/admin/ListShows.jsx'
import BookingList from './components/admin/BookingList.jsx'
import AddShows from './components/admin/AddShows.jsx'

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
    {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path:"add-shows", element: <AddShows /> },
      { path:"list-shows", element: <ListShows /> },
      { path:"list-bookings", element: <BookingList /> },
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
