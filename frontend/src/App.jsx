import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import BlogDetails from "./pages/BlogDetails";
import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import Profile from "./pages/Profile";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")),
  );

  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          bg-zinc-950
          flex
          flex-col
        "
      >
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<Blog />} />

            <Route path="/categories" element={<Categories />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/blog/:id" element={<BlogDetails />} />

            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile setUserInfo={setUserInfo} />
                </ProtectedRoute>
              }
            />

            

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route
              path="/login"
              element={<Login setUserInfo={setUserInfo} />}
            />

            <Route
              path="/register"
              element={<Register setUserInfo={setUserInfo} />}
            />

          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
