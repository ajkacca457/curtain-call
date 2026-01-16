import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

const ManageShowTiming = () => {
  const { id: showId } = useParams();

  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(null);
  const [existingShowTimes, setExistingShowTimes] = useState([]);

  const [showPrice, setShowPrice] = useState({
    regular: 200,
    premium: 350,
  });

  const [showsInput, setShowsInput] = useState([
    { date: "", time: [""] },
  ]);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {

    console.log("Fetching show and showtimes for showId:", showId);

    const loadData = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const [showRes, showTimeRes] = await Promise.all([
          api.get(`/api/shows/${showId}`),
          api.get(`/api/admin/show-times/${showId}`),
        ]);

        console.log("✅ Fetched show and showtimes data",showRes);

        setShow(showRes.data.show);
        setExistingShowTimes(showTimeRes.data.showTimes);
      } catch (err) {
        toast.error("Failed to load show data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [showId]);

  // ---------------- FORM HELPERS ----------------
  const addDateBlock = () => {
    setShowsInput([...showsInput, { date: "", time: [""] }]);
  };

  const removeDateBlock = (index) => {
    setShowsInput(showsInput.filter((_, i) => i !== index));
  };

  const updateDate = (index, value) => {
    const updated = [...showsInput];
    updated[index].date = value;
    setShowsInput(updated);
  };

  const updateTime = (dateIndex, timeIndex, value) => {
    const updated = [...showsInput];
    updated[dateIndex].time[timeIndex] = value;
    setShowsInput(updated);
  };

  const addTime = (dateIndex) => {
    const updated = [...showsInput];
    updated[dateIndex].time.push("");
    setShowsInput(updated);
  };

  const removeTime = (dateIndex, timeIndex) => {
    const updated = [...showsInput];
    updated[dateIndex].time = updated[dateIndex].time.filter(
      (_, i) => i !== timeIndex
    );
    setShowsInput(updated);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    try {
      const token = await getToken();

      await api.post(
        "/api/show-time",
        {
          showId,
          showsInput,
          showPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Showtimes added successfully");
      setShowsInput([{ date: "", time: [""] }]);
    } catch (err) {
      toast.error("Failed to add showtimes");
    }
  };

  // ---------------- GROUP EXISTING SHOWTIMES ----------------
  const groupedShowTimes = existingShowTimes.reduce((acc, item) => {
    const date = new Date(item.showDateTime).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(
      new Date(item.showDateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    return acc;
  }, {});

  if (loading) {
    return <div className="p-6 text-gray-500">Loading showtimes...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold">
        🎭 Manage Showtimes — {show?.title}
      </h1>

      {/* EXISTING SHOWTIMES */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Showtimes</h2>
        {Object.keys(groupedShowTimes).length === 0 ? (
          <p className="text-gray-500">No showtimes added yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(groupedShowTimes).map(([date, times]) => (
              <div key={date} className="bg-gray-50 p-3 rounded">
                <p className="font-medium">{date}</p>
                <div className="flex gap-2 flex-wrap mt-1">
                  {times.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD SHOWTIMES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">➕ Add New Showtimes</h2>

        {/* PRICE */}
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            placeholder="Regular Price"
            value={showPrice.regular}
            onChange={(e) =>
              setShowPrice({ ...showPrice, regular: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Premium Price"
            value={showPrice.premium}
            onChange={(e) =>
              setShowPrice({ ...showPrice, premium: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
        </div>

        {showsInput.map((block, dateIndex) => (
          <div key={dateIndex} className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <input
                type="date"
                value={block.date}
                onChange={(e) => updateDate(dateIndex, e.target.value)}
                className="border p-2 rounded"
              />
              {showsInput.length > 1 && (
                <button
                  onClick={() => removeDateBlock(dateIndex)}
                  className="text-red-500 text-sm"
                >
                  Remove Date
                </button>
              )}
            </div>

            {block.time.map((t, timeIndex) => (
              <div key={timeIndex} className="flex gap-2 mb-2">
                <input
                  type="time"
                  value={t}
                  onChange={(e) =>
                    updateTime(dateIndex, timeIndex, e.target.value)
                  }
                  className="border p-2 rounded"
                />
                {block.time.length > 1 && (
                  <button
                    onClick={() => removeTime(dateIndex, timeIndex)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => addTime(dateIndex)}
              className="text-indigo-600 text-sm"
            >
              + Add Time
            </button>
          </div>
        ))}

        <button
          onClick={addDateBlock}
          className="text-indigo-600 text-sm mb-4"
        >
          + Add Another Date
        </button>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Save Showtimes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageShowTiming;
