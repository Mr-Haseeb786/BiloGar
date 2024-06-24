const { Router } = require("express");
const {
  handlePostNewBlog,
  handleGetCreateBlogPage,
  upload,
  handlePostComments,
  handleGetSingleBlog,
} = require("../controllers/blog");
const { blogModel } = require("../models/blog");

const router = Router();

router.get("/add-new", handleGetCreateBlogPage);
router.post("/add-new", upload.single("coverImage"), handlePostNewBlog);

router.get("/:id", handleGetSingleBlog);

router.post("/comment/:blogId", handlePostComments);

module.exports = router;
