require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// express
const app = express();

// middlewares
app.use(express.json()); // looks for body data
app.use((req, res, next) => {
  console.log(req.method, " :: ", req.path);
  next();
});

// routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);



// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests when db is connected
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("ERROR: ", error.message);
  });
