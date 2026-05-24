import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();

  const { userInfo, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="
        min-h-screen
        bg-zinc-950
        text-white
        px-6
        py-12
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
        "
      >
        {/* TOP CARD */}

        <div
          className="
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            rounded-3xl
            p-10
            mb-10
            shadow-2xl
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-8
            "
          >
            <div>
              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-white
                  text-black
                  flex
                  items-center
                  justify-center
                  text-4xl
                  font-bold
                  mb-5
                "
              >
                {userInfo?.name?.charAt(0)}
              </div>

              <h1
                className="
                  text-4xl
                  font-bold
                  mb-2
                "
              >
                {userInfo?.name}
              </h1>

              <p
                className="
                  text-lg
                  text-zinc-100
                "
              >
                {userInfo?.email}
              </p>
            </div>

            {/* LOGOUT */}

            <button
              onClick={logoutHandler}
              className="
                bg-red-500
                hover:bg-red-600
                px-8
                py-4
                rounded-2xl
                font-bold
                text-lg
                transition
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
