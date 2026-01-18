import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showTimeId, selectedSeats, show } = location.state || {};

  if (!showTimeId || !selectedSeats || !show) {
    toast.error("Booking information missing!");
    navigate(-1);
    return null;
  }

  // Calculate total amount (assuming show.showPrice is number)
  const ticketPrice = show.showPrice || 350; // fallback price
  const totalAmount = ticketPrice * selectedSeats.length;

  const handleConfirmBooking = () => {
    // TODO: Call createBooking API
    toast.success("Booking confirmed!"); 
    navigate("/my-bookings"); // Redirect after booking
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Confirm Your Booking</h2>

      {/* Show Info */}
      <div className="flex gap-6 mb-6 items-center">
        <img
          src={show.poster_path}
          alt={show.title}
          className="w-24 h-36 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{show.title}</h3>
          <p className="text-sm text-gray-500">Runtime: {show.runtime} min</p>
          <p className="text-sm text-gray-500">Rating: ⭐ {show.vote_average}</p>
        </div>
      </div>

      {/* Selected Seats */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Selected Seats</h4>
        <div className="flex flex-wrap gap-2">
          {selectedSeats.map((seat) => (
            <div
              key={seat}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-medium"
            >
              {seat}
            </div>
          ))}
        </div>
      </div>

      {/* Screen Illustration */}
      <div className="text-center mb-6">
        <img src={ScreenImage} alt="screen" className="mx-auto" />
        <p className="text-sm text-gray-500 mt-1">Screen</p>
      </div>

      {/* Pricing */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <span className="font-medium">Total Seats: {selectedSeats.length}</span>
        <span className="font-semibold text-lg">Total: ${totalAmount}</span>
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
