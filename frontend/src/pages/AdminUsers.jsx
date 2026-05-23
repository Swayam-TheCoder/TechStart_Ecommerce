import { useEffect, useState } from "react";
import { authHeader } from "../services/authHeader";
import { API } from "../services/api";


function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/api/users`, {
          headers: authHeader(),
        });

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email
      .toLowerCase()

      .includes(search.toLowerCase()),
  );

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-8
      py-10
    "
    >
      <h1
        className="
        text-5xl
        font-bold
        text-green-400
        mb-10
      "
      >
        User Emails
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search email.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-zinc-900
          border
          border-zinc-700
          rounded-2xl
          px-5
          py-4
          mb-10
          outline-none
        "
      />

      {/* USERS */}
      <div
        className="
        grid
        gap-5
      "
      >
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="
                bg-zinc-900
                p-6
                rounded-2xl
                flex
                items-center
                justify-between
              "
          >
            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {user.name}
              </h2>

              <p
                className="
                  text-zinc-400
                  mt-2
                "
              >
                {user.email}
              </p>
            </div>

            <p
              className="
                text-green-400
              "
            >
              Active User
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
