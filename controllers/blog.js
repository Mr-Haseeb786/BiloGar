const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { blogModel } = require("../models/blog");
const { commentModel } = require("../models/comments");

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
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user.id,
  });
  res.redirect(`/blog/${blog._id}`);
}

async function handlePostComments(req, res) {
  if (!req.user) return res.end("Please Login to comment");

  try {
    await commentModel.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user.id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.log(error);
    return res.end("There was an error while commenting");
  }
}

async function handleGetSingleBlog(req, res) {
  try {
    const singleBlog = await blogModel
      .findById(req.params.id)
      .populate("createdBy");
    const blogComments = await commentModel
      .find({
        blogId: req.params.id,
      })
      .populate("createdBy");

    return res.render("single-blog", {
      user: req.user,
      blog: singleBlog,
      comments: blogComments,
    });
  } catch (error) {
    return res.end("There was an error while fetching the blogs");
  }
}

module.exports = {
  handlePostNewBlog,
  handleGetCreateBlogPage,
  upload,
  handlePostComments,
  handleGetSingleBlog,
};
