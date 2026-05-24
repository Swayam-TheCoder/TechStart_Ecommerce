import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",

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

    // NAME VALIDATION

    if (formData.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");

      return;
    }

    // EMAIL VALIDATION

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");

      return;
    }

    // PASSWORD VALIDATION

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const data = await registerUser(formData);

      if (data.token) {
        login(data);
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error creating account");
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
          Create Account
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
            Register
          </button>
        </div>

        <p
          className="
          text-zinc-400
          text-center
          mt-6
        "
        >
          Already have account?
          <Link
            to="/login"
            className="
              text-cyan-400
              ml-2
            "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
