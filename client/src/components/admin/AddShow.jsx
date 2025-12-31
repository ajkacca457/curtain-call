import { useState } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";
import api from "../../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const AddShows = () => {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    genres: "",
    casts: "",
    release_date: "",
    original_language: "en",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    runtime: 90,
    isActive: true,
    isFeatured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const payload = {
        ...formData,
        genres: formData.genres.split(",").map((g) => g.trim()),
        casts: formData.casts.split(",").map((c) => c.trim()),
        vote_average: Number(formData.vote_average),
        vote_count: Number(formData.vote_count),
        runtime: Number(formData.runtime),
      };

      const res = await api.post("/api/admin", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Show created successfully!");
      setFormData({
        title: "",
        overview: "",
        poster_path: "",
        backdrop_path: "",
        genres: "",
        casts: "",
        release_date: "",
        original_language: "en",
        tagline: "",
        vote_average: 0,
        vote_count: 0,
        runtime: 90,
        isActive: true,
        isFeatured: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create show");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Show</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          placeholder="Overview"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="poster_path"
          value={formData.poster_path}
          onChange={handleChange}
          placeholder="Poster URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="backdrop_path"
          value={formData.backdrop_path}
          onChange={handleChange}
          placeholder="Backdrop URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          placeholder="Genres (comma separated)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="casts"
          value={formData.casts}
          onChange={handleChange}
          placeholder="Casts (comma separated)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
          placeholder="Tagline"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="vote_average"
          value={formData.vote_average}
          onChange={handleChange}
          placeholder="Vote Average (0-10)"
          className="w-full p-2 border rounded"
          min={0}
          max={10}
          step={0.1}
          required
        />
        <input
          type="number"
          name="vote_count"
          value={formData.vote_count}
          onChange={handleChange}
          placeholder="Vote Count"
          className="w-full p-2 border rounded"
          min={0}
          required
        />
        <input
          type="number"
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
          placeholder="Runtime (minutes)"
          className="w-full p-2 border rounded"
          min={1}
          required
        />
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShows;
