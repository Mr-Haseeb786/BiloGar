const { Router } = require("express");
const {
  handlePostNewBlog,
  handleGetCreateBlogPage,
  upload,
} = require("../controllers/blog");

const router = Router();

router.get("/add-new", handleGetCreateBlogPage);
router.post("/add-new", upload.single("coverImage"), handlePostNewBlog);

module.exports = router;
