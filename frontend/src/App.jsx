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

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./pages/AdminProducts";
import AdminBlogs from "./pages/AdminBlogs";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import AffiliateDisclosure from "./pages/AffiliateDisclosure";
import TermsConditions from "./pages/TermsConditions";

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

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/blogs"
              element={
                <AdminRoute>
                  <AdminBlogs />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/contacts"
              element={
                <AdminRoute>
                  <AdminContacts />
                </AdminRoute>
              }
            />

            <Route path="/admin/users" element={<AdminUsers />} />

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

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route
              path="/affiliate-disclosure"
              element={<AffiliateDisclosure />}
            />

            <Route path="/terms-and-conditions" element={<TermsConditions />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
