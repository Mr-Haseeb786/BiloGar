const express = require("express");
const path = require("path");
const { connectToDB } = require("./utils/connection");
const cookieParser = require("cookie-parser");
const { checkForAuthentications } = require("./middlewares/authentication");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { blogModel } = require("./models/blog");

require("dotenv").config();

const app = express();
const PORT = 8000;

connectToDB(process.env.DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to Connect"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public/images")));
app.use(cookieParser());
app.use(checkForAuthentications("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await blogModel.find({});
  res.render("homepage", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
