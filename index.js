const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const { connectToDB } = require("./utils/connection");
require("dotenv").config();

const app = express();
const PORT = 8000;

connectToDB(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to Connect"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
