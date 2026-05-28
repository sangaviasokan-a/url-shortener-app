import { useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/url/shorten", {
        originalUrl: url,
      });

      setShortUrl(res.data.shortUrl);
      setUrl("");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Create Short URL</h2>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button type="submit">Shorten URL</button>

        {shortUrl && (
          <div className="result">
            <p>Short URL:</p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default Dashboard;