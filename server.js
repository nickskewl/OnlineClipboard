const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//Connect Database
connectDB();

//Init Middleware  (work like body parser for api response)
app.use(express.json({ extended: false }));

//Home page message
// app.get("/", (req, res) => res.json({ msg: "Welcome" }));

// Define Routes
app.use("/api/clip", require("./routes/clips"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
