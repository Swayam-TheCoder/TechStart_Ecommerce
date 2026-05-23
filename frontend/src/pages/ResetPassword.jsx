import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { API } from "../services/api";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/api/auth/reset-password/${token}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        },
      );

      const data = await response.json();

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Reset Password
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

export default ResetPassword;
