const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const { connectToDB } = require("./utils/connection");
const cookieParser = require("cookie-parser");
const { checkForAuthentications } = require("./middlewares/authentication");
require("dotenv").config();

const app = express();
const PORT = 8000;

connectToDB(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to Connect"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentications("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("homepage", {
    user: req.user,
  });
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
