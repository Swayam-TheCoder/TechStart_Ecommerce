import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCart } from "../utils/cart";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userInfo } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();

      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

      setCartCount(totalItems);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);
  // LOAD USER
  return (
    <nav
      className="
        bg-zinc-900
        text-white
        px-6
        py-5
        border-b
        border-zinc-800
        sticky
        top-0
        z-50
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        {/* LOGO */}

        <Link
          to="/"
          className="
            text-3xl
            font-bold
            text-cyan-400
          "
        >
          TechStart
        </Link>

        {/* DESKTOP MENU */}

        <div
          className="
            hidden
            md:flex
            items-center
            gap-6
            text-lg
          "
        >
          <Link
            to="/"
            className="
              hover:text-cyan-400
              transition
            "
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="
              hover:text-cyan-400
              transition
            "
          >
            Categories
          </Link>

          <Link
            to="/blog"
            className="
              hover:text-cyan-400
              transition
            "
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className="
              hover:text-cyan-400
              transition
            "
          >
            Contact
          </Link>

          <Link
            to="/wishlist"
            className="
              hover:text-cyan-400
              transition
            "
          >
            ❤️
          </Link>

          <Link
            to="/cart"
            className="
    relative
    hover:text-cyan-400
    transition
  "
          >
            <ShoppingCart size={24} />

            {cartCount > 0 && (
              <span
                className="
        absolute
        -top-3
        -right-3
        bg-cyan-500
        text-white
        text-xs
        w-5
        h-5
        rounded-full
        flex
        items-center
        justify-center
      "
              >
                {cartCount}
              </span>
            )}
          </Link>

          {!userInfo && (
            <>
              <Link
                to="/login"
                className="
                  hover:text-cyan-400
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  hover:text-cyan-400
                  transition
                "
              >
                Register
              </Link>
            </>
          )}

          {userInfo && (
            <Link
              to="/profile"
              className="
                hover:text-cyan-400
                transition
              "
            >
              Profile
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
          "
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div
          className="
            md:hidden
            mt-6
            flex
            flex-col
            gap-5
            bg-zinc-800
            p-6
            rounded-2xl
          "
        >
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </Link>

          <Link to="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({cartCount})
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            Wishlist
          </Link>

          {!userInfo && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}

          {userInfo && (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
