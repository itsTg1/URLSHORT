import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh,setRefresh]=useState(false);
  const navigate = useNavigate();
  const base=import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUrls();
    setRefresh(false)
  }, [refresh]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${base}/api/url/admin/all`); 
      setUrls(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-10 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back to Home
          </button>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="w-32"></div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg text-black">
          <table className="min-w-full text-sm text-left border border-gray-200 text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Short ID</th>
                <th className="px-4 py-2 border-b">Original URL</th>
                <th className="px-4 py-2 border-b">Short URL</th>
                <th className="px-4 py-2 border-b">Visits</th>
              </tr>
            </thead>
            <tbody>
              {urls.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No shortened URLs found.
                  </td>
                </tr>
              ) : (
                urls.map((url) => (
                  <tr key={url._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{url.shortId}</td>
                    <td className="px-4 py-2 border-b break-all">{url.fullUrl}</td>
                    <td className="px-4 py-2 border-b">
                      <a
                        onClick={()=>setRefresh(true)}
                        href={`${base}/${url.shortId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {`${base}/${url.shortId}`}
                      </a>
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {url.clicks}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
