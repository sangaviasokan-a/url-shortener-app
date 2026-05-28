import { useState, useEffect } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);

  // Load history on page load
  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const res = await API.get("/urls");
      setUrls(res.data);
    } catch (error) {
      alert("Failed to load URLs");
    }
  };

  // Create short URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/url", {
        originalUrl,
      });

      // add new URL at top of history
      setUrls((prev) => [res.data, ...prev]);
      setOriginalUrl("");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating URL");
    }
  };

  // Copy to clipboard
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  // Delete URL
  const handleDelete = async (id) => {
    try {
      await API.delete(`/url/${id}`);
      setUrls((prev) => prev.filter((url) => url._id !== id));
    } catch (error) {
      alert("Failed to delete URL");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Short URL</h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button type="submit">Generate</button>
        </form>

        {/* History Section */}
        <div className="history">
          {urls.length === 0 ? (
            <p>No URLs created yet</p>
          ) : (
            urls.map((url) => (
              <div key={url._id} className="card">
                <p className="original">{url.originalUrl}</p>

                <a href={url.shortUrl} target="_blank" rel="noreferrer">
                  {url.shortUrl}
                </a>

                <div className="actions">
                  <button onClick={() => handleCopy(url.shortUrl)}>
                    Copy
                  </button>

                  <button onClick={() => handleDelete(url._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;