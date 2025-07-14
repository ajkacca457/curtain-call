import { dummyBookingData } from "../assets/data";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { format } from "date-fns";

const Bookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎟️ Your Bookings</h2>

      <div className="grid gap-6">
        {bookings.map((booking, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-5"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={booking.show.movie.poster_path}
                  alt={booking.show.movie.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.show.movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Show Time:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {format(new Date(booking.show.showDateTime), "PPPp")}
                    </span>
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
                      {booking.show.showPrice}
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right md:text-center">
                {!booking.isPaid && <button className="btn btn-success my-2">Pay Now</button>}

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
