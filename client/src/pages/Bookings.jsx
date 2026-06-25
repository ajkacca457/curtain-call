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
  const [filter, setFilter] = useState("all");
  const { getToken } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await api.get("/api/booking/my-bookings", { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data.bookings || []);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  useEffect(() => {
    let filtered = [...bookings];
    if (filter === "today")    filtered = filtered.filter((b) => isToday(new Date(b.showTime.showDateTime)));
    if (filter === "upcoming") filtered = filtered.filter((b) => isFuture(new Date(b.showTime.showDateTime)));
    if (filter === "past")     filtered = filtered.filter((b) => isPast(new Date(b.showTime.showDateTime)));
    setFilteredBookings(filtered);
  }, [filter, bookings]);

  if (loading) return <Loading />;

  const filters = ["all", "today", "upcoming", "past"];

  return (
    <div className="max-w-[800px] mx-auto px-6 py-12 min-h-screen">

      {/* Header */}
      <div className="mb-9">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-8 h-0.5 bg-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37]">Account</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-[#f5f5f5]">My Bookings</h1>
      </div>

      {/* Empty state */}
      {bookings.length === 0 && (
        <div className="flex items-center justify-center py-24 text-[#888] text-sm">
          You have no bookings yet.
        </div>
      )}

      {bookings.length > 0 && (
        <>
          {/* Filter tabs */}
          <div className="flex gap-2 mb-7 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded text-xs uppercase tracking-wider cursor-pointer transition-all duration-200
                  ${filter === f
                    ? "border border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                    : "border border-[#333] bg-transparent text-[#888] hover:border-[#555]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Booking cards */}
          <div className="flex flex-col gap-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-[#111] border border-[#222] rounded-lg px-6 py-5 hover:border-[#333] transition-colors duration-200">
                <div className="flex gap-5 flex-wrap justify-between">

                  {/* Left — show info */}
                  <div className="flex gap-4 flex-1">
                    <img
                      src={booking.showTime.showId.poster_path}
                      alt={booking.showTime.showId.title}
                      className="w-16 h-24 object-cover rounded flex-shrink-0 border border-[#222]"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#f5f5f5] mb-2">
                        {booking.showTime.showId.title}
                      </h3>
                      <p className="text-sm text-[#d4af37] mb-1.5">
                        {format(new Date(booking.showTime.showDateTime), "EEE d MMM yyyy, HH:mm")}
                      </p>
                      <p className="text-sm text-[#888] mb-1">
                        Seats: <span className="text-[#f5f5f5]">{booking.bookedSeats.join(", ")}</span>
                      </p>
                      <p className="text-xs text-[#555]">
                        {currency}{booking.amount / booking.bookedSeats.length} × {booking.bookedSeats.length}
                      </p>
                    </div>
                  </div>

                  {/* Right — amount + status */}
                  <div className="flex flex-col items-end gap-2.5">
                    <span className="font-serif text-2xl font-bold text-[#f5f5f5]">
                      {currency}{booking.amount}
                    </span>
                    <span className={`text-xs uppercase tracking-wider px-2.5 py-1 rounded border
                      ${booking.isPaid
                        ? "text-[#4caf7d] border-[#4caf7d]"
                        : "text-[#d4a017] border-[#d4a017]"
                      }`}>
                      {booking.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;