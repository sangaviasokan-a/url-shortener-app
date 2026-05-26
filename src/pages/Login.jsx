import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      login(res.data.user, res.data.token);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="overlay">
          <h1>Shorten URLs Easily 🚀</h1>

          <p>
            Create smart, fast and secure short links for your business,
            projects and social media.
          </p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
            alt="url"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Login to manage your shortened URLs
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* GOOGLE BUTTON */}
          <button className="google-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
            />
            Sign in with Google
          </button>

          <p className="bottom-text">
              Don't have an account?
              <Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;