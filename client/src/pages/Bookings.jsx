import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { format, isToday, isFuture, isPast } from "date-fns";
import api from "../api/axiosInstance.js";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const Bookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "€";
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, today, upcoming, past
  const { getToken } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await api.get("/api/booking/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = [...bookings];
    if (filter === "today") {
      filtered = filtered.filter((b) => isToday(new Date(b.showTime.showDateTime)));
    } else if (filter === "upcoming") {
      filtered = filtered.filter((b) => isFuture(new Date(b.showTime.showDateTime)));
    } else if (filter === "past") {
      filtered = filtered.filter((b) => isPast(new Date(b.showTime.showDateTime)));
    }
    setFilteredBookings(filtered);
  }, [filter, bookings]);

  if (loading) return <Loading />;

  if (bookings.length === 0)
    return (
      <div className="p-6 text-center text-gray-500">
        You have no bookings.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎟️ Your Bookings</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["all", "today", "upcoming", "past"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={booking.showTime.showId.poster_path}
                  alt={booking.showTime.showId.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.showTime.showId.title}
                  </h3>
                  {/* Highlighted Date & Time */}
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 font-semibold mt-1">
                    {format(new Date(booking.showTime.showDateTime), "PPPp")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seats:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {booking.bookedSeats.join(", ")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Price per seat:{" "}
                    <span className="font-medium">
                      {currency}
                      {booking.amount / booking.bookedSeats.length}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right md:text-center">
                {!booking.isPaid && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg mb-2">
                    Pay Now
                  </button>
                )}

                <p
                  className={`text-sm font-medium mb-2 ${
                    booking.isPaid ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Pending Payment"}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {currency}
                  {booking.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
