import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { showTimeId, selectedSeats, show, showPrice } = location.state || {};

  if (!showTimeId || !selectedSeats || !show) {
    toast.error("Booking information missing!");
    navigate(-1);
    return null;
  }

  const ticketPrice = showPrice || 350;
  const totalAmount = ticketPrice * selectedSeats.length;

  const handleConfirmBooking = async () => {
    try {
      const payload = { showTimeId, selectedSeats, show };
      const { data } = await api.post("/api/booking/create-stripe-session", payload, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      window.location.href = data.url;
    } catch (err) {
      console.log(err);
      toast.error("Failed to start payment");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="bg-[#111] border border-[#222] rounded-lg px-9 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-0.5 bg-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37]">Checkout</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#f5f5f5]">Booking Summary</h2>
        </div>

        {/* Show info */}
        <div className="flex gap-5 mb-7 pb-7 border-b border-[#222]">
          <img
            src={show.poster_path}
            alt={show.title}
            className="w-18 h-24 rounded object-cover flex-shrink-0 border border-[#222]"
          />
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#f5f5f5] mb-2">{show.title}</h3>
            <p className="text-sm text-[#888] mb-1">Runtime: {show.runtime} min</p>
            <p className="text-sm text-[#d4af37]">★ {show.vote_average}</p>
          </div>
        </div>

        {/* Seats */}
        <h4 className="text-xs font-medium uppercase tracking-widest text-[#888] mb-3">
          Selected Seats
        </h4>
        <div className="mb-6">
          {selectedSeats.map((seat) => (
            <div key={seat} className="flex justify-between py-2.5 border-b border-[#222] text-sm">
              <span className="text-[#f5f5f5]">Seat {seat}</span>
              <span className="text-[#888]">€{ticketPrice}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center p-4 mb-7 bg-[#d4af37]/10 border border-[#a8892a] rounded-lg">
          <span className="text-sm font-medium text-[#f5f5f5]">
            Total ({selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""})
          </span>
          <span className="font-serif text-2xl font-bold text-[#d4af37]">
            €{totalAmount}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-[#d4af37] text-[#0a0a0a] font-bold text-xs uppercase tracking-widest py-3.5 rounded hover:opacity-90 transition-opacity duration-200"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;