import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const [urls, setUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/url",
        {
          originalUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setShortUrl(res.data.shortUrl);

      fetchUrls();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const fetchUrls = async () => {
    try {
      const res = await API.get("/url/myurls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUrls(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);

    alert("Copied!");
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Short URL</h2>

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

        {shortUrl && (
          <div className="result">
            <p>Short URL:</p>

            <a href={shortUrl} target="_blank">
              {shortUrl}
            </a>
          </div>
        )}
      </div>

      <div className="url-list">
        <h2>My URLs</h2>

        {urls.map((url) => (
          <div key={url._id} className="url-card">
            <p>
              <strong>Original:</strong> {url.originalUrl}
            </p>

            <p>
              <strong>Short:</strong>{" "}
              <a href={url.shortUrl} target="_blank">
                {url.shortUrl}
              </a>
            </p>

            <p>
              <strong>Clicks:</strong> {url.clicks}
            </p>

            <button onClick={() => copyUrl(url.shortUrl)}>
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;