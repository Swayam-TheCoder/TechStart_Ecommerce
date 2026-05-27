import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());

const allowedOrigins = [
  "http://localhost:5174",
  "https://tech-start-ecommerce.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or curl/postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false); // ❗ don't throw error
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("TechStart API Running");
});

// authentication routes
app.use("/api/auth", authRoutes);

// admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// contact routes
app.use("/api/contact", contactRoutes);

// order routes
app.use("/api/orders", orderRoutes);

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
