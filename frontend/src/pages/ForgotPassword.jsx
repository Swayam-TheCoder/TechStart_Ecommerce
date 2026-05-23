import { useState } from "react";
import { API } from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/api/auth/forgot-password`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.log(error);
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
        onSubmit={submitHandler}
        className="
          bg-zinc-900
          p-10
          rounded-3xl
          w-full
          max-w-md
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
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            bg-zinc-800
            text-white
            px-5
            py-4
            rounded-xl
            outline-none
            mb-5
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
          "
        >
          Send Reset Link
        </button>

        {message && (
          <p
            className="
              text-green-400
              mt-5
              text-center
            "
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
