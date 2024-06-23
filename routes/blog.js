const { Router } = require("express");
const {
  handlePostNewBlog,
  handleGetCreateBlogPage,
  upload,
} = require("../controllers/blog");
const { blogModel } = require("../models/blog");

const router = Router();

router.get("/add-new", handleGetCreateBlogPage);
router.post("/add-new", upload.single("coverImage"), handlePostNewBlog);

router.get("/:id", async (req, res) => {
  const singleBlog = await blogModel.findById(req.params.id);
  res.render("single-blog", {
    user: req.user,
    blog: singleBlog,
  });
});

module.exports = router;
