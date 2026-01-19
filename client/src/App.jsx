import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shows from "./pages/Shows.jsx";
import ShowDetails from "./pages/ShowDetails.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import Bookings from "./pages/Bookings.jsx";
import Favorite from "./pages/Favorite.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";

import AppLayout from "./components/AppLayout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ListShows from "./components/admin/ListShows.jsx";
import BookingList from "./components/admin/BookingList.jsx";
import AddShow from "./components/admin/AddShow.jsx";
import AdminUpcomingShows from "./components/admin/AdminUpcomingShows.jsx";
import AdminEditShow from "./components/admin/AdminEditShow.jsx";
import ManageShowTiming from "./components/admin/ManageShowTiming.jsx";
import ConfirmBooking from "./pages/ConfirmBooking.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

import { AppProvider } from "./context/AppContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <AppLayout />
      </AppProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/shows", element: <Shows /> },
      { path: "/shows/:id", element: <ShowDetails /> },
      { path: "/shows/:id/:date", element: <SeatLayout /> },
      { path: "/shows/confirm-booking", element: <ConfirmBooking /> },
      { path: "/my-bookings", element: <Bookings /> },
      { path: "/my-favorite", element: <Favorite /> },
      {path: "/payment-success", element:<PaymentSuccess/>},
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AppProvider>
        <ProtectedAdminRoute>
          <AdminProvider>
            <AdminLayout />
          </AdminProvider>
        </ProtectedAdminRoute>
      </AppProvider>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add-show", element: <AddShow /> },
      { path: "list-shows", element: <ListShows /> },
      { path: "upcoming-shows", element: <AdminUpcomingShows /> },
      { path: "list-bookings", element: <BookingList /> },
      { path: "edit-show/:id", element: <AdminEditShow /> },
      { path: "shows/:id/show-times", element: <ManageShowTiming /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
