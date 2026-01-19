// src/pages/PaymentSuccess.jsx
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 bg-white shadow rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
      <p className="mb-6">Thank you for your purchase. Your seats are now confirmed.</p>
      <button
        onClick={() => navigate("/my-bookings")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        View My Bookings
      </button>
    </div>
  );
};

export default PaymentSuccess;
