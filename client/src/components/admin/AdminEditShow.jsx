import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminEditShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const [casts, setCasts] = useState([{ name: "", profile_path: "" }]);

  // Load existing show
  useEffect(() => {
    const loadShow = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const res = await api.get(`/api/shows/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const show = res.data.show;

        // Pre-fill form
        setFormData({
          title: show.title || "",
          overview: show.overview || "",
          poster_path: show.poster_path || "",
          backdrop_path: show.backdrop_path || "",
          genres: show.genres?.map((g) => g.name).join(",") || "",
          release_date: show.release_date?.$date
            ? show.release_date.$date.split("T")[0]
            : show.release_date || "",
          original_language: show.original_language || "en",
          tagline: show.tagline || "",
          vote_average: show.vote_average || 0,
          vote_count: show.vote_count || 0,
          runtime: show.runtime || 90,
          isActive: !!show.isActive,
          isFeatured: !!show.isFeatured,
        });

        setCasts(
          show.casts?.length ? show.casts : [{ name: "", profile_path: "" }]
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load show");
      } finally {
        setLoading(false);
      }
    };

    loadShow();
  }, [id, getToken]);

  // Form handlers (same as AddShows)
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

  const addCast = () => setCasts([...casts, { name: "", profile_path: "" }]);
  const removeCast = (index) =>
    setCasts(casts.filter((_, i) => i !== index));

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

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

      await api.put(`/api/admin/shows/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Show updated successfully");
      navigate("/admin/list-shows");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update show");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading show...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Show</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
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
          name="poster_path"
          value={formData.poster_path}
          onChange={handleChange}
          placeholder="Poster URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="backdrop_path"
          value={formData.backdrop_path}
          onChange={handleChange}
          placeholder="Backdrop URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="genres"
          value={formData.genres}
          onChange={handleChange}
          placeholder="Genres (comma separated)"
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
          min={0}
          max={10}
          step={0.1}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="vote_count"
          value={formData.vote_count}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
          min={1}
          className="w-full p-2 border rounded"
          required
        />

        {/* Cast Section */}
        <div className="space-y-3">
          <h3 className="font-semibold">Casts</h3>
          {casts.map((cast, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Cast name"
                value={cast.name}
                onChange={(e) =>
                  handleCastChange(index, "name", e.target.value)
                }
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
                <button
                  type="button"
                  onClick={() => removeCast(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCast}
            className="text-indigo-600 text-sm"
          >
            + Add Cast
          </button>
        </div>

        <div className="flex gap-4">
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
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update Show"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditShow;
