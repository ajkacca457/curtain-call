import { useEffect, useState } from "react";
import api from "../../api/axiosInstance.js";
import { useAuth } from "@clerk/clerk-react";

const AdminNewsManagement = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedNews, setSelectedNews] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    image: "",
  });

  const { getToken } = useAuth();

  // Fetch all news
  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/news");
      setNewsList(data.news);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle deleting a news item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?"))
      return;

    try {

      const token= await getToken()

      await api.delete(`/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNews();
      setShowViewModal(false);
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  // Handle creating a news item
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newNews.title || !newNews.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const token= await getToken()
      await api.post("/api/news", newNews, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewNews({ title: "", description: "", image: "" });
      setShowCreateModal(false);
      fetchNews();
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Admin News Management</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowCreateModal(true)}
        >
          Add News
        </button>
      </div>

      {loading ? (
        <div>Loading news...</div>
      ) : newsList.length === 0 ? (
        <div>No news available.</div>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr
                key={news._id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSelectedNews(news);
                  setShowViewModal(true);
                }}
              >
                <td className="p-2">{news.title}</td>
                <td className="p-2">
                  {new Date(news.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View/Delete Modal */}
      {showViewModal && selectedNews && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-2">{selectedNews.title}</h3>
            <p className="mb-4">{selectedNews.description}</p>
            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="mb-4 max-h-48 w-full object-cover"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(selectedNews._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create News Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-96 relative">
            <h3 className="text-lg font-bold mb-2">Add News</h3>
            <form onSubmit={handleCreate} className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={newNews.title}
                onChange={(e) =>
                  setNewNews({ ...newNews, title: e.target.value })
                }
                className="border px-2 py-1 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newNews.description}
                onChange={(e) =>
                  setNewNews({ ...newNews, description: e.target.value })
                }
                className="border px-2 py-1 rounded"
                rows={4}
                required
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={newNews.image}
                onChange={(e) =>
                  setNewNews({ ...newNews, image: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsManagement;
