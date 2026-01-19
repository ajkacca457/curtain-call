import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";


const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { showTimeId, selectedSeats, show } = location.state || {};

  if (!showTimeId || !selectedSeats || !show) {
    toast.error("Booking information missing!");
    navigate(-1);
    return null;
  }

  const ticketPrice = show.showPrice || 350; // fallback price
  const totalAmount = ticketPrice * selectedSeats.length;

  const handleConfirmBooking = async () => {
    try {
      const payload = {
        showTimeId,
        selectedSeats,
        show,
      };

      const { data } = await api.post(
        "/api/booking/create-stripe-session",
        payload,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      window.location.href = data.url; // Redirect to Stripe
    } catch (err) {
      console.log(err);
      toast.error("Failed to start payment");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Booking Summary
      </h2>

      {/* Show Info */}
      <div className="flex gap-4 mb-6 items-center">
        <img
          src={show.poster_path}
          alt={show.title}
          className="w-20 h-28 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{show.title}</h3>
          <p className="text-sm text-gray-500">Runtime: {show.runtime} min</p>
          <p className="text-sm text-gray-500">
            Rating: ⭐ {show.vote_average}
          </p>
        </div>
      </div>

      {/* Seats & Pricing */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Selected Seats</h4>
        <ul className="border rounded-lg divide-y">
          {selectedSeats.map((seat) => (
            <li
              key={seat}
              className="flex justify-between px-4 py-2 text-sm font-medium"
            >
              <span>{seat}</span>
              <span>€{ticketPrice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg font-semibold text-lg">
        <span>Total ({selectedSeats.length} seats)</span>
        <span>€{totalAmount}</span>
      </div>

      {/* Confirm Button */}
      <div className="text-center">
        <button
          onClick={handleConfirmBooking}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
