require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const songRoutes = require("./routes/songs");
const systemRoutes = require("./routes/system");
const userRoutes = require("./routes/users");
const preferenceRoutes = require("./routes/preferences");
const assignmentRoutes = require("./routes/assignments");
const authRoutes = require("./routes/authentication");
const SystemState = require("./models/systemstateModel");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(
  session({
    secret: "secret-key", // change
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/songs", songRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/", authRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // ensure one SystemState exists
    const existing = await SystemState.findOne();
    if (!existing) {
      const defaultState = new SystemState(); // uses defaults
      await defaultState.save();
      console.log("Initialized default SystemState");
    }

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
