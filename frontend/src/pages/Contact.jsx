import { useState } from "react";
import { API } from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
      const response = await fetch(`${API}/api/contact`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
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
          max-w-xl
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
          Contact Us
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-800
              px-5 py-4
              rounded-xl
              outline-none
            "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-800
              px-5 py-4
              rounded-xl
              outline-none
            "
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-800
              px-5 py-4
              rounded-xl
              outline-none
            "
            required
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
              transition
            "
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
