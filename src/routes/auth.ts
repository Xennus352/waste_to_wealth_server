import { Router } from "express";
import passport from "passport";
import { logout } from "../controllers/auth.controller";
import "../auth/google";

const router = Router();

// Google authentication route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
  }),
  (req, res) => {
    // Access the session token from the user object
    const user = req.user as any;

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
  }
);

// Logout route
router.post("/logout", logout);

export default router;
