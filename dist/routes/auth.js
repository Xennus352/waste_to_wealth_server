"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
require("../auth/google");
const router = (0, express_1.Router)();
// Google authentication route
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Google callback route
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "http://localhost:5173",
}), (req, res) => {
    // Access the session token from the user object
    const user = req.user;
    // Set the session token in an HTTP-only cookie
    res.cookie("session_token", user.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    // Redirect to another route
    res.redirect("http://localhost:5173/app/feed");
});
// Logout route
router.post("/logout", auth_controller_1.logout);
exports.default = router;
