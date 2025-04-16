"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const like_1 = __importDefault(require("./routes/like"));
const useful_1 = __importDefault(require("./routes/useful"));
const save_1 = __importDefault(require("./routes/save"));
const comment_1 = __importDefault(require("./routes/comment"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const handmade_1 = __importDefault(require("./routes/handmade"));
const market_1 = __importDefault(require("./routes/market"));
const order_1 = __importDefault(require("./routes/order"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// Middleware
const corsOptions = {
    origin: "http://localhost:5173", // Specify your frontend origin
    credentials: true, // Allow credentials
};
server.use((0, cors_1.default)(corsOptions)); // Enable CORS
// ✅ Increase JSON and URL-encoded body limits
server.use(express_1.default.json({ limit: '25mb' }));
server.use(express_1.default.urlencoded({ extended: true, limit: '25mb' }));
server.use((0, cookie_parser_1.default)()); // Parse cookies
//server.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
server.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret123", // Use environment variable for session secret
    resave: false,
    saveUninitialized: true,
}));
server.use(passport_1.default.initialize()); // Initialize Passport
server.use(passport_1.default.session()); // Use Passport session
// Public Routes (No Authentication Required)
server.use("/auth", auth_1.default); // Authentication routes
// for ui protect cookie
// server.get("/api/me", AuthRouter, (req, res) => {
//   res.json({ user: (req as any).user });
// });
// Protected Routes (Require Authentication)
server.use("/api/user", middleware_1.authenticateSession, user_1.default); //// User CRUD
server.use("/api/post", middleware_1.authenticateSession, post_1.default); // Post CRUD
server.use("/api/like", middleware_1.authenticateSession, like_1.default); //// Like CRUD
server.use("/api/useful", middleware_1.authenticateSession, useful_1.default); //// Useful CRUD
server.use("/api/save", middleware_1.authenticateSession, save_1.default); //// Save CRUD
server.use("/api/comment", middleware_1.authenticateSession, comment_1.default); //// Comment CRUD
server.use("/api/feedback", middleware_1.authenticateSession, feedback_1.default); //// Feedback CRUD
server.use("/api/handmade", middleware_1.authenticateSession, handmade_1.default); //! Handmade guide CRUD
server.use("/api/market", middleware_1.authenticateSession, market_1.default); //// Market CRUD
server.use("/api/order", middleware_1.authenticateSession, order_1.default); //// Order CRUD
// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
