import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Loading from "../components/Loading";
import { isoTimeFormat } from "../lib/utils";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const { getToken } = useAuth();

  const [show, setShow] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rowGroups = [["A","B"],["C","E"],["D","F"],["G","I"],["H","J"]];

  useEffect(() => {
    const fetchShowTimes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/admin/show-times/${id}`);
        setShow(data.show);
        setShowTimes(data.showTimes || []);
      } catch (err) {
        toast.error("Failed to load show times");
      } finally {
        setLoading(false);
      }
    };
    fetchShowTimes();
  }, [id]);

  const dayShowTimes = showTimes.filter((st) => st.showDateTime.startsWith(date));

  const handleSeatClick = (seatId, isOccupied) => {
    if (!selectedTime) return toast("Please select a show time first");
    if (isOccupied) return;
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast("Maximum 5 seats per booking");
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const occupiedSeats = selectedTime ? [
    ...Object.keys(selectedTime.occupiedSeats || {}),
    ...Object.keys(selectedTime.temporaryHolds || {}).filter(
      (seat) => selectedTime.temporaryHolds[seat].userId !== userId
    ),
  ] : [];

  const renderRows = (row, count = 9) => (
    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isOccupied = occupiedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId, isOccupied)}
            disabled={isOccupied}
            title={seatId}
            className={`w-9 h-9 rounded text-[10px] font-medium transition-all duration-150
              ${isOccupied
                ? "bg-[#1a1a1a] border border-[#222] text-[#555] cursor-not-allowed"
                : isSelected
                  ? "bg-[#d4af37] border border-[#d4af37] text-[#0a0a0a] font-bold cursor-pointer"
                  : "bg-[#111] border border-[#333] text-[#888] cursor-pointer hover:border-[#555]"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  const handleProceed = async () => {
    if (!selectedTime || selectedSeats.length === 0) return;
    try {
      const payload = { showTimeId: selectedTime._id, selectedSeats, userId };
      const res = await api.post("/api/booking/hold-seats", payload);
      if (res.data.success) {
        toast.success("Seats held — proceeding to checkout");
        navigate("/shows/confirm-booking", {
          state: { showTimeId: selectedTime._id, selectedSeats, show, showPrice: selectedTime.showPrice },
        });
      } else {
        toast.error(res.data.message || "Failed to hold seats");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to hold seats");
    }
  };

  if (loading) return <Loading />;
  if (!show || showTimes.length === 0) {
    return (
      <div className="py-16 text-center text-[#888]">
        No showtimes available for this date.
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-[280px_1fr] gap-6">

      {/* Sidebar */}
      <div className="flex flex-col gap-4">

        {/* Show info */}
        <div className="bg-[#111] border border-[#222] rounded-lg p-4">
          <div className="flex gap-3">
            <img src={show.poster_path} alt={show.title} className="w-16 h-24 rounded object-cover flex-shrink-0 border border-[#222]" />
            <div>
              <h3 className="font-serif text-sm font-semibold text-[#f5f5f5] mb-2">{show.title}</h3>
              <p className="text-xs text-[#888] mb-1">
                {new Date(date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
              </p>
              <p className="text-xs text-[#888] mb-1">⏱ {show.runtime} min</p>
              <p className="text-xs text-[#d4af37]">★ {show.vote_average}</p>
            </div>
          </div>
        </div>

        {/* Time selector */}
        <div className="bg-[#111] border border-[#222] rounded-lg p-5">
          <h3 className="font-serif text-base font-semibold text-[#f5f5f5] mb-4">Show Time</h3>
          {dayShowTimes.length === 0 ? (
            <p className="text-sm text-[#888]">No shows for this date</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {dayShowTimes.map((st) => (
                <button
                  key={st._id}
                  onClick={() => { setSelectedTime(st); setSelectedSeats([]); }}
                  className={`py-2 px-1 rounded text-xs cursor-pointer transition-all duration-200
                    ${selectedTime?._id === st._id
                      ? "border border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                      : "border border-[#333] bg-[#1a1a1a] text-[#888] hover:border-[#555]"
                    }`}
                >
                  {isoTimeFormat(st.showDateTime)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="bg-[#111] border border-[#222] rounded-lg p-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-[#555] mb-3">Legend</h3>
          {[
            { bg: "bg-[#111]", border: "border-[#333]", label: "Available" },
            { bg: "bg-[#d4af37]", border: "border-[#d4af37]", label: "Selected" },
            { bg: "bg-[#1a1a1a]", border: "border-[#222]", label: "Occupied" },
          ].map(({ bg, border, label }) => (
            <div key={label} className="flex items-center gap-2.5 mb-2">
              <div className={`w-5 h-5 rounded ${bg} border ${border}`} />
              <span className="text-xs text-[#888]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Seat layout */}
      <div className="bg-[#111] border border-[#222] rounded-lg p-8 min-h-[70vh]">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl font-semibold text-[#f5f5f5] mb-4">Choose Your Seats</h3>
          <img src={ScreenImage} alt="screen" className="max-w-[360px] mx-auto opacity-20 invert" />
          <p className="text-xs text-[#555] mt-1.5 tracking-widest uppercase">Screen</p>
        </div>

        <div className="mt-6">
          {rowGroups[0].map((row) => renderRows(row))}
        </div>
        <div className="grid grid-cols-2 gap-8 mt-6">
          {rowGroups.slice(1).map((group, idx) => (
            <div key={idx}>{group.map((row) => renderRows(row))}</div>
          ))}
        </div>

        {selectedSeats.length > 0 && (
          <div className="mt-10 text-center border-t border-[#222] pt-7">
            <p className="text-sm text-[#888] mb-4">
              {selectedSeats.length} seat{selectedSeats.length > 1 ? "s" : ""} selected:{" "}
              <span className="text-[#f5f5f5]">{selectedSeats.join(", ")}</span>
            </p>
            <button
              onClick={handleProceed}
              className="px-10 py-3.5 text-xs uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;