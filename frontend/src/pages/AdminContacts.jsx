import { useEffect, useState } from "react";

import { authHeader } from "../services/authHeader";
import { API } from "../services/api";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH CONTACTS
  // ======================

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API}/api/contact`, {
        headers: authHeader(),
      });

      const data = await response.json();

      setContacts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <h1
        className="
        text-white
        text-center
        mt-20
      "
      >
        Loading...
      </h1>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      px-6
      py-10
    "
    >
      <h1
        className="
        text-5xl
        font-bold
        text-cyan-400
        mb-10
      "
      >
        Contact Messages
      </h1>

      <div
        className="
        grid
        gap-6
      "
      >
        {contacts.length === 0 && (
          <h1
            className="
            text-zinc-400
            text-2xl
          "
          >
            No Messages
          </h1>
        )}

        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="
              bg-zinc-900
              p-6
              rounded-3xl
            "
          >
            <h2
              className="
              text-2xl
              font-bold
              text-cyan-400
              mb-3
            "
            >
              {contact.name}
            </h2>

            <p
              className="
              text-zinc-300
              mb-2
            "
            >
              <span
                className="
                font-bold
              "
              >
                Email:
              </span>{" "}
              {contact.email}
            </p>

            <p
              className="
              text-zinc-300
              leading-7
            "
            >
              <span
                className="
                font-bold
              "
              >
                Message:
              </span>{" "}
              {contact.message}
            </p>

            <p
              className="
              text-zinc-500
              mt-4
              text-sm
            "
            >
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminContacts;
