import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../utils/prisma";
import { v4 as uuidv4 } from "uuid"; // For generating session IDs

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // callbackURL: "http://localhost:8000/auth/google/callback",
      callbackURL:
        "https://waste-to-wealth-server.vercel.app/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Upsert user in the database
        const user = await prisma.user.upsert({
          where: { email: profile.emails![0].value },
          update: { name: profile.displayName },
          create: {
            email: profile.emails![0].value,
            name: profile.displayName,
            ProfilePic: profile.photos![0].value,
          },
        });

        // Generate a session token
        const sessionToken = uuidv4();

        // Create a session for the user
        await prisma.session.create({
          data: {
            id: uuidv4(), // Generate a unique session ID
            userId: user.id,
            sessionToken,
          },
        });

        // Attach session token to the user object
        done(null, { ...user, sessionToken });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, { id: user.id, sessionToken: user.sessionToken }); // Include session token in the serialized user
});

passport.deserializeUser(
  async (data: { id: string; sessionToken: string }, done) => {
    try {
      // Find the user by ID
      const user = await prisma.user.findUnique({ where: { id: data.id } });

      // Attach session token to the user object
      if (user) {
        done(null, { ...user, sessionToken: data.sessionToken });
      } else {
        done(null, null);
      }
    } catch (err) {
      done(err);
    }
  }
);
