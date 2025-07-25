import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import connect from "./db/connect.js";
import User from "./models/User.js";
import asyncHandler from "express-async-handler";
import { Session } from "inspector/promises";

dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  routes: {
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    login: "/login",
    logout: "/logout",
  },
  session: {
    absoluteDuration: 30 * 24 * 60 * 60 * 1000,
    cookie: {
      domain: "job-portal-app-nextjs-nodejs-mongodb.onrender.com",
      secure: true,
      sameSite: "None",
    },
  },
};

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(auth(config));

// Function to check if user exist in db
const isUserInDateBase = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        role: "jobseeker",
        profilePicture: user.picture,
      });

      await newUser.save();

      console.log("User added to db", newUser);
    } else {
      console.log("User already exist in db", existingUser);
    }
  } catch (error) {
    console.log("Error checking or adding user to db", error.message);
  }
});

app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    await isUserInDateBase(req.oidc.user);

    return res.redirect(process.env.CLIENT_URL);
  } else {
    return res.send("logged out");
  }
});

// Routes
const routesFiles = fs.readdirSync("./routes");
routesFiles.forEach((file) => {
  // Import dynamic routes
  import(`./routes/${file}`)
    .then((route) => {
      app.use("/api/v1/", route.default);
    })
    .catch((error) => {
      console.log("Importing routes error...", error.message);
    });
});

const PORT = process.env.PORT || 8000;

const server = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

server();
