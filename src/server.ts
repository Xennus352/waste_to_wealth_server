import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateSession } from "./middleware";

import AuthRouter from "./routes/auth";
import UserRouter from "./routes/user";
import PostRouter from "./routes/post";
import LikeRouter from "./routes/like";
import CommentRouter from "./routes/comment";
import FeedbackRouter from "./routes/feedback";
import HandmadeRouter from "./routes/handmade";
import MarketRouter from "./routes/market";
import OrderRouter from "./routes/order";

dotenv.config();

const server = express();

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Specify your frontend origin
  credentials: true, // Allow credentials
};

server.use(cors(corsOptions)); // Enable CORS
server.use(express.json()); // Parse JSON requests
server.use(cookieParser()); // Parse cookies
server.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
server.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123", // Use environment variable for session secret
    resave: false,
    saveUninitialized: true,
  })
);
server.use(passport.initialize()); // Initialize Passport
server.use(passport.session()); // Use Passport session

// Public Routes (No Authentication Required)
server.use("/auth", AuthRouter); // Authentication routes

// for ui protect cookie
server.get("/api/me", AuthRouter, (req, res) => {
  res.json({ user: (req as any).user });
});

// Protected Routes (Require Authentication)
server.use("/api/user", authenticateSession, UserRouter); // User CRUD
server.use("/api/post", authenticateSession, PostRouter); // Post CRUD
server.use("/api/like", authenticateSession, LikeRouter); // Like CRUD
server.use("/api/comment", authenticateSession, CommentRouter); // Comment CRUD
server.use("/api/feedback", authenticateSession, FeedbackRouter); // Feedback CRUD
server.use("/api/handmade", authenticateSession, HandmadeRouter); // Handmade guide CRUD
server.use("/api/market", authenticateSession, MarketRouter); // Market CRUD
server.use("/api/order", authenticateSession, OrderRouter); // Order CRUD

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
