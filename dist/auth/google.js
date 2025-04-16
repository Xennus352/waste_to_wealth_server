"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = require("../utils/prisma");
const uuid_1 = require("uuid"); // For generating session IDs
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true,
}, async function (request, accessToken, refreshToken, profile, done) {
    try {
        // Upsert user in the database
        const user = await prisma_1.prisma.user.upsert({
            where: { email: profile.emails[0].value },
            update: { name: profile.displayName },
            create: {
                email: profile.emails[0].value,
                name: profile.displayName,
                ProfilePic: profile.photos[0].value,
            },
        });
        // Generate a session token
        const sessionToken = (0, uuid_1.v4)();
        // Create a session for the user
        await prisma_1.prisma.session.create({
            data: {
                id: (0, uuid_1.v4)(), // Generate a unique session ID
                userId: user.id,
                sessionToken,
            },
        });
        // Attach session token to the user object
        done(null, { ...user, sessionToken });
    }
    catch (err) {
        done(err);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, { id: user.id, sessionToken: user.sessionToken }); // Include session token in the serialized user
});
passport_1.default.deserializeUser(async (data, done) => {
    try {
        // Find the user by ID
        const user = await prisma_1.prisma.user.findUnique({ where: { id: data.id } });
        // Attach session token to the user object
        if (user) {
            done(null, { ...user, sessionToken: data.sessionToken });
        }
        else {
            done(null, null);
        }
    }
    catch (err) {
        done(err);
    }
});
