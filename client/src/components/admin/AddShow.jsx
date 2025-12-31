import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../../api/axiosInstance";
import toast from "react-hot-toast";

const AddShows = () => {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    genres: "",
    release_date: "",
    original_language: "en",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    runtime: 90,
    isActive: true,
    isFeatured: false,
  });

  const [casts, setCasts] = useState([
    { name: "", profile_path: "" },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const updated = [...casts];
    updated[index][field] = value;
    setCasts(updated);
  };

  const addCast = () => {
    setCasts([...casts, { name: "", profile_path: "" }]);
  };

  const removeCast = (index) => {
    setCasts(casts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();

      const payload = {
        ...formData,
        release_date: new Date(formData.release_date),
        vote_average: Number(formData.vote_average),
        vote_count: Number(formData.vote_count),
        runtime: Number(formData.runtime),
        genres: formData.genres
          .split(",")
          .map((g) => ({ name: g.trim() })),
        casts: casts.filter((c) => c.name.trim() !== ""),
      };

      await api.post("/api/admin", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Show created successfully");

      setFormData({
        title: "",
        overview: "",
        poster_path: "",
        backdrop_path: "",
        genres: "",
        release_date: "",
        original_language: "en",
        tagline: "",
        vote_average: 0,
        vote_count: 0,
        runtime: 90,
        isActive: true,
        isFeatured: false,
      });

      setCasts([{ name: "", profile_path: "" }]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create show");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Show</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea name="overview" value={formData.overview} onChange={handleChange} placeholder="Overview" className="w-full p-2 border rounded" required />
        <input name="poster_path" value={formData.poster_path} onChange={handleChange} placeholder="Poster URL" className="w-full p-2 border rounded" required />
        <input name="backdrop_path" value={formData.backdrop_path} onChange={handleChange} placeholder="Backdrop URL" className="w-full p-2 border rounded" required />
        <input name="genres" value={formData.genres} onChange={handleChange} placeholder="Genres (comma separated)" className="w-full p-2 border rounded" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Tagline" className="w-full p-2 border rounded" />
        <input type="number" name="vote_average" value={formData.vote_average} onChange={handleChange} min={0} max={10} step={0.1} className="w-full p-2 border rounded" required />
        <input type="number" name="vote_count" value={formData.vote_count} onChange={handleChange} min={0} className="w-full p-2 border rounded" required />
        <input type="number" name="runtime" value={formData.runtime} onChange={handleChange} min={1} className="w-full p-2 border rounded" required />

        {/* Cast Section */}
        <div className="space-y-3">
          <h3 className="font-semibold">Casts</h3>
          {casts.map((cast, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Cast name"
                value={cast.name}
                onChange={(e) => handleCastChange(index, "name", e.target.value)}
                className="flex-1 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={cast.profile_path}
                onChange={(e) =>
                  handleCastChange(index, "profile_path", e.target.value)
                }
                className="flex-1 p-2 border rounded"
              />
              {casts.length > 1 && (
                <button type="button" onClick={() => removeCast(index)} className="text-red-500">
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addCast} className="text-indigo-600 text-sm">
            + Add Cast
          </button>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured
          </label>
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShows;
