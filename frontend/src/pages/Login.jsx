import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authApi";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
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

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // EMAIL VALIDATION

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Enter valid email");

      return;
    }

    // PASSWORD VALIDATION

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");

      return;
    }

    try {
      const data = await loginUser(formData);

      if (data.token) {
        login(data);

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      flex
      items-center
      justify-center
      px-6
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
          bg-zinc-900
          p-10
          rounded-3xl
          w-full
          max-w-md
          shadow-2xl
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-cyan-400
          text-center
          mb-8
        "
        >
          Welcome Back
        </h1>

        <div className="space-y-5">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-800
              text-white
              px-5 py-4
              rounded-xl
              outline-none
            "
          />

          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-800
              text-white
              px-5 py-4
              rounded-xl
              outline-none
            "
          />

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="
      text-cyan-400
      text-sm
    "
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              py-4
              rounded-xl
              font-bold
              text-lg
              transition
            "
          >
            Login
          </button>
        </div>

        <p
          className="
          text-zinc-400
          text-center
          mt-6
        "
        >
          Don't have account?
          <Link
            to="/register"
            className="
              text-cyan-400
              ml-2
            "
          >
            Register
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
