const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { blogModel } = require("../models/blog");

function handleGetCreateBlogPage(req, res) {
  return res.render("addblog", {
    user: req.user,
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/images/uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

async function handlePostNewBlog(req, res) {
  const { title, body: blogBody } = req.body;
  if (!title || !blogBody)
    return res.render("addblog", {
      error: "Please provide a title and a description",
    });

  const blog = await blogModel.create({
    title,
    body: blogBody,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  res.redirect(`/blog/${blog._id}`);
}

module.exports = { handlePostNewBlog, handleGetCreateBlogPage, upload };
