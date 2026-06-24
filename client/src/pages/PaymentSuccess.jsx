import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center min-h-screen">
      <div className="bg-[#111] border border-[#222] rounded-lg px-10 py-14">

        {/* Icon */}
        <div className="w-18 h-18 rounded-full border-2 border-[#d4af37] bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-7">
          <span className="text-3xl text-[#d4af37]">✓</span>
        </div>

        <h2 className="font-serif text-3xl font-bold text-[#f5f5f5] mb-3">
          Booking Confirmed
        </h2>
        <div className="w-8 h-0.5 bg-[#d4af37] mx-auto mb-5" />
        <p className="text-sm text-[#888] leading-relaxed mb-9">
          Your payment was successful. Your seats are reserved — enjoy the show.
        </p>

        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-[#d4af37] text-[#0a0a0a] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:opacity-90 transition-opacity duration-200"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;